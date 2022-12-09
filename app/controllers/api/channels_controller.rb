class Api::ChannelsController < ApplicationController
	wrap_parameters :channel, include: Channel.attribute_names + ["workspaceId", "ownerId", "contentEdited" "seenUser"]
  before_action :require_logged_in

  def create
		@channel = Channel.create(channel_params)
		@workspace = Workspace.find_by_id(@channel.workspace_id)
		@user_ids = @workspace.users.map {|user| user[:id]}

    if @channel.save
			@user_ids.each do |user_id|
				@channel_subscription = ChannelSubscription.create(user_id: user_id, channel_id: @channel.id)
			end

			WorkspacesChannel.broadcast_to @workspace,
				type: 'RECEIVE_NEW_CHANNEL',
				**from_template('api/channels/show', channel: @channel)

			render json: nil, status: :ok
		else
      render json: {errors: @channel.errors.full_messages}, status: 422
    end
  end

	def update 
		@channel = Channel.find_by_id(params[:id]) 
		@workspace = Workspace.find_by_id(@channel.workspace_id)
		@content_edited = params[:content_edited] == "true"
		@seen_user = params[:seen_user]
		
		if !@channel.seen_last_message.include?(@seen_user.to_i)
			@channel.seen_last_message << @seen_user
		end

		if @channel.update(channel_params)
			if @content_edited == true
				WorkspacesChannel.broadcast_to @workspace,
					type: 'EDIT_CHANNEL',
					**from_template('api/channels/show', channel: @channel)

				render json: nil, status: :ok
			else  
				render "api/channels/c_show"
			end		
		else
			render json: {errors: @channel.errors.full_messages}, status: 422
		end
	end 

	def destroy
		@channel = Channel.find_by_id(params[:id])
		@workspace = Workspace.find_by_id(@channel.workspace_id)

		if @channel.destroy 
			WorkspacesChannel.broadcast_to @workspace,
				type: 'REMOVE_CHANNEL',
				id: @channel.id

			render "/api/workspaces/w_show"		
		end
	end

	def show
		@channel = Channel.find_by_id(params[:id])
		render "/api/channels/c_show"
	end


	private 

	def channel_params
		params.require(:channel).permit(:id, :name, :description, :workspace_id, :owner_id, :content_edited, :seen_user)
	end
end

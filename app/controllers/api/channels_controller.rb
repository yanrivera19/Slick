class Api::ChannelsController < ApplicationController
	wrap_parameters :channel, include: Channel.attribute_names + ["workspaceId", "ownerId"]
  before_action :require_logged_in

  def create
		@channel = Channel.create(channel_params)
		@workspace = Workspace.find_by_id(@channel.workspace_id)
		@user_ids = @workspace.users.map {|user| user[:id]}

    if @channel.save
			@user_ids.each do |user_id|
				@channel_subscription = ChannelSubscription.create(user_id: user_id, channel_id: @channel.id)
				#add seen_last_message column to channel table with default value of empty array
				#shovel into channel.seen_last_message array each user_id
			end

			WorkspacesChannel.broadcast_to @workspace,
				type: 'RECEIVE_NEW_CHANNEL',
				**from_template('api/channels/show', channel: @channel)
      # render "/api/workspaces/w_show"
			render json: nil, status: :ok
		else
      render json: {errors: @channel.errors.full_messages}, status: 422
    end
  end

	def update 
		@channel = Channel.find_by_id(params[:id]) 
		@workspace = Workspace.find_by_id(@channel.workspace_id)
		#@channel?updaste or workspace&update????
		if @channel.update(channel_params)
			WorkspacesChannel.broadcast_to @workspace,
				type: 'EDIT_CHANNEL',
				**from_template('api/channels/show', channel: @channel)

			render json: nil, status: :ok			
		else
			render json: {errors: @channel.errors.full_messages}, status: 422
		end
	end 

	def destroy
		@channel = Channel.find_by_id(params[:id])
		@workspace = Workspace.find_by_id(@channel.workspace_id)
		
		# if @channel.owner_id == current_user.id
		# 	@channel.destroy
		# 	render "/api/workspaces/w_show"
		# end

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
		params.require(:channel).permit(:id, :name, :description, :workspace_id, :owner_id)
	end
end

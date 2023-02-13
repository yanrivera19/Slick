class Api::DirectMessagesController < ApplicationController
	wrap_parameters :direct_message, include: DirectMessage.attribute_names + ["workspaceId", "seenUser"]
  before_action :require_logged_in

  def create
		@direct_message = DirectMessage.create(direct_message_params)
		@workspace = Workspace.find_by_id(@direct_message.workspace_id)
		@user_ids = params[:users].map {|user| user[:id]}
		@users =  params[:users]
		@message = Message.create(content: params[:message][:content], author_name: params[:message][:author_name], author_id: params[:message][:author_id], messageable_type: params[:message][:messageable_type], messageable_id: @direct_message.id )
		@direct_message.seen_last_message[@message.author_id] = @message.author_id.to_i

    if @direct_message.save
			@user_ids.each do |user_id|
				@direct_message_subscription = DirectMessageSubscription.create(user_id: user_id, direct_message_id: @direct_message.id)
			end
			WorkspacesChannel.broadcast_to @workspace,
				type: 'RECEIVE_NEW_DIRECT_MESSAGE',
				**from_template('api/direct_messages/show', direct_message: @direct_message)
	
			render json: nil, status: :ok

    else
      render json: {errors: @direct_message.errors.full_messages}, status: 422
    end
  end

	def update 
		@direct_message = DirectMessage.find_by_id(params[:id]) 
		@workspace = Workspace.find_by_id(@direct_message.workspace_id)
		@seen_user = params[:seen_user]

		if @seen_user != "undefined"
			@direct_message.seen_last_message[@seen_user] = @seen_user.to_i
		end

		if @direct_message.update(direct_message_params)
			WorkspacesChannel.broadcast_to @workspace,
				type: 'EDIT_DIRECT_MESSAGE',
				**from_template('api/direct_messages/show', direct_message: @direct_message)

			render json: nil, status: :ok			
		else
			render json: {errors: @direct_message.errors.full_messages}, status: 422
		end
	end 

	def show
		@direct_message = DirectMessage.find_by_id(params[:id])

		render "/api/direct_messages/d_show"
	end

	def destroy
		@direct_message = DirectMessage.find_by_id(params[:id])
		@workspace = Workspace.find_by_id(@direct_message.workspace_id)
		
		if @direct_message.owner_id == current_user.id
			@direct_message.destroy
			render "/api/workspaces/w_show"
		end
	end

	private 

	def direct_message_params
		params.require(:direct_message).permit(:id, :workspace_id, :users, :message, :seen_user)
	end
end

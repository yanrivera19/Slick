class Api::DirectMessagesController < ApplicationController
	wrap_parameters :direct_message, include: DirectMessage.attribute_names + ["workspaceId"]
  before_action :require_logged_in

	# def index 
	# 	@direct_messages = DirectMessage.where({})
	# end

  def create
		# debugger
		@direct_message = DirectMessage.create(direct_message_params)
		@workspace = Workspace.find_by_id(@direct_message.workspace_id)
		user_ids = params[:users].map {|user| user[:id]} 
		@message = Message.create(content: params[:message][:content], author_name: params[:message][:author_name], author_id: params[:message][:author_id], messageable_type: params[:message][:messageable_type], messageable_id: @direct_message.id )
		debugger
    if @direct_message.save
			user_ids.each do |user_id|
				@direct_message_subscription = DirectMessageSubscription.create(user_id: user_id, direct_message_id: @direct_message.id)

			end
			# DirectMessagesChannel.broadcast_to @direct_message, 
			# 	type: 'RECEIVE_DIRECT_MESSAGE',
			# 	**from_template("api/direct_messages/message", direct_message: @direct_message)


      render "/api/direct_messages/show"
    else
      render json: {errors: @direct_message.errors.full_messages}, status: 422
    end
  end

	def update 
		@direct_message = DirectMessage.find_by_id(params[:id]) 
		@workspace = Workspace.find_by_id(@direct_message.workspace_id)
		#@direct_message?updaste or direct_message&update????
		if @direct_message.update(direct_message_params)
			render "/api/workspaces/show"
		else
			render json: {errors: @direct_message.errors.full_messages}, status: 422
		end
	end 

	def show
		@direct_message = DirectMessage.find_by_id(params[:id])

		render :show
	end

	def destroy
		@direct_message = DirectMessage.find_by_id(params[:id])
		@workspace = Workspace.find_by_id(@direct_message.workspace_id)
		
		if @direct_message.owner_id == current_user.id
			@direct_message.destroy
			render "/api/workspaces/show"
		end
	end

	private 

	def direct_message_params
		params.require(:direct_message).permit(:workspace_id, :users, :message)
	end
end

class Api::DirectMessagesController < ApplicationController
	wrap_parameters :direct_message, include: DirectMessage.attribute_names + ["workspaceId"]
  before_action :require_logged_in

  def create
		@direct_message = DirectMessage.new(direct_message_params)
		@workspace = Workspace.find_by_id(@direct_message.workspace_id)

    if @direct_message.save
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
		params.require(:direct_message).permit(:workspace_id)
	end
end

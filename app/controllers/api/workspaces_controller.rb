class Api::WorkspacesController < ApplicationController
	before_action :require_logged_in

  def create
		@workspace = Workspace.new(workspace_params)
    if @workspace.save
      render :show
    else
      render json: {errors: @workspace.errors.full_messages}, status: 422
    end
  end

	def index 
		@workspaces = current_user.workspaces 

		render :index
	end

	def update 
		@workspace = Workspace.find_by_id(params[:id]) 
		#@workspace?updaste or workspace&update????
		if @workspace.update(workspace_params)
			render :show
		else
			render json: {errors: @workspace.errors.full_messages}, status: 422
		end
	end 

	def show
		@workspace = Workspace.find_by_id(params[:id])
		@direct_messages = DirectMessage.joins(:direct_message_subscriptions).where(direct_messages: {workspace_id: params[:id]}).where(direct_message_subscriptions: {user_id: current_user.id})
		# @messages = []
		# @direct_messages.each do |direct_message| 
		# 	direct_message.messages.each do |message| 
		# 		@message << message
		# 	end
		# end
		render :show
	end

	def destroy
		@workspace = Workspace.find_by_id(params[:id]) 
		@user = User.find_by_id(@workspace.owner_id)
		if @workspace.owner_id == current_user.id
			@workspace.destroy
			render "/api/users/show"
		end
	end

	private 

	def workspace_params
		params.require(:workspace).permit(:name, :workspace_id)
	end
end

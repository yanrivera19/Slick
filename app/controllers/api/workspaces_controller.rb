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
		params.require(:workspace).permit(:name)
	end
end

class Api::ChannelsController < ApplicationController
  before_action :require_logged_in

  def create
		@channel = Channel.new(channel_params)
		@workspace = Workspace.find_by_id(@channel.workspace_id)

    if @channel.save
      render "/api/workspaces/show"
	else
      render json: {errors: @channel.errors.full_messages}, status: 422
    end
  end

	def update 
		@channel = Channel.find_by_id(params[:id]) 
		@workspace = Workspace.find_by_id(@channel.workspace_id)
		#@channel?updaste or workspace&update????
		if @channel.update(channel_params)
			render "/api/workspaces/show"
		else
			render json: {errors: @channel.errors.full_messages}, status: 422
		end
	end 

	def show
		@channel = Channel.find_by_id(params[:id])
		render :show
	end

	def destroy
		@channel = Channel.find_by_id(params[:id])
		@workspace = Workspace.find_by_id(@channel.workspace_id)
		
		if @channel.owner_id == current_user.id
			@channel.destroy
			render "/api/workspaces/show"
		end
	end

	private 

	def channel_params
		params.require(:channel).permit(:name)
	end
end

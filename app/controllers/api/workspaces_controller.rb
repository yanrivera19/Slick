class Api::WorkspacesController < ApplicationController
	wrap_parameters :workspace, include: Workspace.attribute_names + ["workspaceId", "ownerId"]
	before_action :require_logged_in

  def create
		@workspace = Workspace.create(workspace_params)
		@users = params[:users]
		@user_ids = params[:users].map {|user| user[:id]}
		@channel_1 = Channel.create(name: "general", workspace_id: @workspace.id, owner_id: params[:owner_id])
		@channel_2 = Channel.create(name: "random", workspace_id: @workspace.id, owner_id: params[:owner_id])

    if @workspace.save
			@user_ids.each do |user_id|
				@workspace_subscription = WorkspaceSubscription.create(user_id: user_id, workspace_id: @workspace.id)
				@channel_subscription_1 = ChannelSubscription.create(user_id: user_id, channel_id: @channel_1.id)
				@channel_subscription_2 = ChannelSubscription.create(user_id: user_id, channel_id: @channel_2.id)
			end

      render "/api/workspaces/w_show"
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
		@users = ActiveSupport::JSON.decode(params[:new_users])
		debugger

		if @users.length > 0
			@user_ids = @users.map {|user| user["id"]} 
			@channels = @workspace.channels

			@user_ids.each do |id|
				WorkspaceSubscription.create(user_id: id, workspace_id: @workspace.id)
				@channels.each do |channel|
					ChannelSubscription.create(user_id: id, channel_id: channel.id)
				end
			end
		end

		if @workspace.update(workspace_params)
			WorkspacesChannel.broadcast_to @workspace,
				type: 'EDIT_WORKSPACE',
				**from_template('api/workspaces/show', workspace: @workspace)

			render json: nil, status: :ok
		else
			render json: {errors: @workspace.errors.full_messages}, status: 422
		end
	end 

	def show
		@workspace = Workspace.find_by_id(params[:id])
		@direct_messages = DirectMessage.joins(:direct_message_subscriptions).where(direct_messages: {workspace_id: params[:id]}).where(direct_message_subscriptions: {user_id: current_user.id})

		render "/api/workspaces/w_show"

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
		params.require(:workspace).permit(:name, :workspace_id, :users, :owner_id)
	end
end

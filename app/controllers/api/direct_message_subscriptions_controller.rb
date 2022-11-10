class Api::DirectMessageSubscriptionsController < ApplicationController
	wrap_parameters :direct_message_subscription, include: DirectMessageSubscription.attribute_names + ["userId", "directMessageId"]
	before_action :require_logged_in

	def create
		# debugger
		@direct_message_subscription = DirectMessageSubscription.new(direct_message_subscription_params);

		if @direct_message_subscription.save 
			@direct_message = DirectMessage.find_by_id(params[:direct_message_id]);
			render "/api/direct_messages/show"
		else
			render json: {errors: @direct_message.errors.full_messages}, status: 422
		end
	end

	def delete 
		@direct_message_subscription = DirectMessageSubscription.find_by_id(params[:id])
		@direct_message = DirectMessage.find_by_id(id: params[:direct_message_id]);
		@user = User.find_by_id(id: params[:user_id]);
	

		if !@direct_message || !@user 
			@direct_message_subscription.destroy
			render "/api/workspaces/show"
		end
	end

	private 

	def direct_message_subscription_params
		params.require(:direct_message_subscription).permit(:user_id, :direct_message_id)
	end
end

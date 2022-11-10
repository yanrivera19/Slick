# require "byebug"

class Api::MessagesController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["authorId", "messageableType", "messageableId", "authorName", "updatedAt"]
	before_action :require_logged_in

  def create
		debugger
		@message = Message.new(message_params)
		@author = User.find_by(id: params[:author_id])
		# debugger
		type = (params[:messageable_type]).downcase
		

		#if I end up adding threads, should check for type thread
		#in conditional below
	
    if @message.save
			# @name_of_channel.broadcast_to(@message.)
			# debugger
			if type == "channel"
				@channel = Channel.find_by_id(params[:messageable_id])

				ChannelsChannel.broadcast_to @message.messageable, 
				  type: 'RECEIVE_MESSAGE',
			    **from_template("api/messages/show", message: @message)
			else 
				@direct_message = DirectMessage.find_by_id(params[:messageable_id])
				debugger
				DirectMessagesChannel.broadcast_to @message.messageable, 
				  type: 'RECEIVE_MESSAGE',
			    **from_template("api/messages/show", message: @message)
			end

			render json: nil, status: :ok
    else
      render json: {errors: @message.errors.full_messages}, status: 422
    end
  end

	def update
		@message = Message.find_by_id(params[:id]) 
		type = (@message.messageable_type).downcase  

		#if I end up adding threads, should check for type thread
		#in conditional below
		
		if @message.update(message_params)
			if type == "channel"
				@channel = Channel.find_by_id(params[:messageable_id])

				ChannelsChannel.broadcast_to @message.messageable, 
				  type: 'EDIT_MESSAGE',
			    **from_template("api/messages/show", message: @message)
			else 
				@direct_message = DirectMessage.find_by_id(params[:messageable_id])

				DirectMessagesChannel.broadcast_to @message.messageable, 
				  type: 'EDIT_MESSAGE',
			    **from_template("api/messages/show", message: @message)
			end

			render json: nil, status: :ok
		else
			render json: {errors: @message.errors.full_messages}, status: 422
		end
	end

	def destroy 
		@message = Message.find_by_id(params[:id]) 
		type = (@message.messageable_type).downcase  

		#if I end up adding threads, should check for type thread
		#in conditional below	

		# if @message.messageable_type == "Channel"
		#   @channel = Channel.find_by_id(@message.messageable_id)
		# else 
		# 	@direct_message = DirectMessage.find_by_id(@message.messageable_id)
		# end

		if @message.destroy
			if type == "channel"
				@channel = Channel.find_by_id(params[:messageable_id])

				ChannelsChannel.broadcast_to @message.messageable, 
				  type: 'REMOVE_MESSAGE',
          id: @message.id
			else 
				@direct_message = DirectMessage.find_by_id(params[:messageable_id])

				DirectMessagesChannel.broadcast_to @message.messageable, 
				  type: 'REMOVE_MESSAGE',
          id: @message.id
			end
			
			render json: nil, status: :ok
		end
	end

	#for seeing threads 
	def show
		@message = Message.find_by_id(params[:id]) 
		render :show
	end

	private 

	def message_params 
		params.require(:message).permit(:id, :content, :author_id, :messageable_id, :messageable_type, :author_name, :updated_at)
	end
end

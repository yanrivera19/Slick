# require "byebug"

class Api::MessagesController < ApplicationController
	wrap_parameters :message, include: Message.attribute_names + ["authorId", "messageableType", "messageableId"]
	before_action :require_logged_in

  def create
		@message = Message.new(message_params)
		@author = User.find_by(id: params[:author_id])
		# debugger
		type = (params[:messageable_type]).downcase

		#if I end up adding threads, should check for type thread
		#in conditional below
		if type == "channel"
		  @channel = Channel.find_by_id(params[:messageable_id])
			# @name_of_channel = ChannelsChannel
		else 
			@direct_message = DirectMessage.find_by_id(params[:messageable_id])
			# @name_of_channel = DirectMessagesChannel
		end

    if @message.save
			# @name_of_channel.broadcast_to(@message.)
			ChannelsChannel.broadcast_to(@message.messageable, @message)
      render "/api/#{type}s/show"
    else
      render json: {errors: @message.errors.full_messages}, status: 422
    end
  end

	def update
		@message = Message.find_by_id(params[:id]) 
		type = (@message.messageable_type).downcase  

		#if I end up adding threads, should check for type thread
		#in conditional below

		if @message.messageable_type == "Channel"
		  @channel = Channel.find_by_id(@message.messageable_id)
		else 
			@direct_message = DirectMessage.find_by_id(@message.messageable_id)
		end
		
		if @message.update(message_params)
			render "/api/#{type}s/show"
		else
			render json: {errors: @message.errors.full_messages}, status: 422
		end
	end

	def destroy 
		@message = Message.find_by_id(params[:id]) 
		type = (@message.messageable_type).downcase  

		#if I end up adding threads, should check for type thread
		#in conditional below

		if @message.messageable_type == "Channel"
		  @channel = Channel.find_by_id(@message.messageable_id)
		else 
			@direct_message = DirectMessage.find_by_id(@message.messageable_id)
		end

		if @message.destroy
			render "/api/#{type}s/show"
		end
	end

	#for seeing threads 
	def show
		@message = Message.find_by_id(params[:id]) 
		render :show
	end

	private 

	def message_params 
		params.require(:message).permit(:content, :author_id, :messageable_id, :messageable_type)
	end
end

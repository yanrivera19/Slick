# require "byebug" 

class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "fun_stream_name"
    # stream_for Room.find_by(id: params[:id])
		debugger
		@channel = Channel.find_by(id: params[:id])
    stream_for @channel
  end
end
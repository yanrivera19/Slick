class DirectMessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "fun_stream_name"
    # stream_for Room.find_by(id: params[:id])
		@direct_message = DirectMessage.find_by(id: params[:id])
    stream_for @direct_message
  end
end
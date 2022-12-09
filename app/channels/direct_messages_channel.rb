class DirectMessagesChannel < ApplicationCable::Channel
  def subscribed
		@direct_message = DirectMessage.find_by(id: params[:id])
    stream_for @direct_message
  end
end
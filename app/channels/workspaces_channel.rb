class WorkspacesChannel < ApplicationCable::Channel

	def subscribed
		@workspace = Workspace.find_by(id: params[:id])
		# @workspace.users do |user| 
		# 	stream_for current_user 
		# end
		stream_for @workspace
  end
end

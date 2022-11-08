json.user do
  json.extract! @user, :id, :email, :username, :created_at, :updated_at

	json.workspaces @user.workspaces do |workspace|
			json.extract! workspace, :id, :name, :owner_id
			
			# json.users workspace.users do |user|
			# 	json.extract! user, :id, :email, :username
			# end
	end
	json.channels do 
		@user.channels.each do |channel|
			json.set! channel.id do 
				json.extract! channel, :id, :name, :owner_id
			end
		end
	end

	json.direct_messages do 
		@user.direct_messages.each do |direct_message|
			json.set! direct_message.id do 
				json.extract! direct_message, :id
			end
		end
	end
end
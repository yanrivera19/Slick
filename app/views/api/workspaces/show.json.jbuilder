# json.workspace do
  json.extract! @workspace, :id, :name, :owner_id, :created_at
	json.users do 
		@workspace.users.each do |user|
			json.set! user.id do 
				json.extract! user, :id, :username, :email
			end
		end
	end
	json.channels do 
		@workspace.channels.each do |channel|
			json.set! channel.id do 
				json.extract! channel, :id, :name, :description, :created_at
				json.type channel.class.name
			end
		end
	end
	json.direct_messages do
		@workspace.direct_messages.each do |direct_message|
			json.set! direct_message.id do 
				json.extract! direct_message, :id
				json.users direct_message.users do |user|
					json.extract! user, :id, :username
				end
			end
		end
		# @workspace.direct_messages do |direct_message|
		# 	json.set! direct_message.id do 
		# 		json.extract! direct_message, :id,
		# 		json.users do 
		# 			direct_message.users.each do |user|
		# 				json.set! user.id do 
		# 					json.extract! user, :id, :username
		# 				end
		# 			end
		# 		end
		# 	end
		# end
	end
# end
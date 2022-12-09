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
				json.extract! channel, :id, :name, :description, :created_at, :owner_id
				json.type channel.class.name
				json.seen_last_message do
					channel.seen_last_message.each do |user_id|
						json.set! user_id, user_id
					end
				end		
				json.users do
					channel.users.each do |user|
						json.set! user.id do 
							json.extract! user, :id, :username, :email
						end
					end
				end				
			end
		end
	end
	json.direct_messages do
		@workspace.direct_messages.each do |direct_message|
			json.set! direct_message.id do 
				json.extract! direct_message, :id
				json.seen_last_message do
					direct_message.seen_last_message.each do |user_id|
						json.set! user_id, user_id
					end
				end	
				json.users direct_message.users do |user|
					json.extract! user, :username
				end
			end
		end 

	end

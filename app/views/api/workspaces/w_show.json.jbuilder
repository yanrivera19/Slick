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
						json.set! user_id[0], user_id[1]
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
		@direct_messages.each do |direct_message|
			json.set! direct_message.id do 
				json.extract! direct_message, :id
				json.seen_last_message do
					direct_message.seen_last_message.each do |user_id|
						json.set! user_id[0], user_id[1]
					end
				end	
				json.users do
					direct_message.users.each do |user|
						json.set! user.id do 
							json.extract! user, :id, :username, :email
						end
					end
				end
			end
		end 

	end

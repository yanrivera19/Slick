	json.direct_message do
		json.extract! @direct_message, :id, :workspace_id, :created_at
	end

	json.users do 
		@direct_message.users.each do |user|
			json.set! user.id do 
				json.extract! user, :id, :username, :email
			end
		end
	end
	
	json.messages do
		@direct_message.messages.each do |message|
			json.set! message.id do 
				json.extract! message, :id, :content, :author_id, :created_at, :updated_at
			end
		end
	end
# end
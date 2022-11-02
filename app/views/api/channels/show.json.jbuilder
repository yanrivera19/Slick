# json.channel do 
	# json.extract! @channel, :id, :name, :workspace_id, :owner_id, :created_at

	json.channel do
		json.extract! @channel, :id, :name, :workspace_id, :owner_id
	end

	json.users do 
		@channel.users.each do |user|
			json.set! user.id do 
				json.extract! user, :id, :username, :email
			end
		end
	end
	
	json.messages do
		@channel.messages.each do |message|
			json.set! message.id do 
				json.extract! message, :id, :content, :author_id, :created_at, :updated_at
			end
		end
	end
# end
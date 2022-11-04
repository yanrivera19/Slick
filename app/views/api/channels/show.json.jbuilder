# json.channel do 
	# json.extract! @channel, :id, :name, :workspace_id, :owner_id, :created_at

	json.channel do
		json.extract! @channel, :id, :name, :workspace_id, :owner_id
		# json.set! @channel.class_name
		
	end

	# json.type do 
	# 	json.set! @channel.class.name
	# end

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
				json.extract! message, :id, :content, :author_id, :author_name, :created_at, :updated_at
			end
		end
	end
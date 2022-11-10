	debugger
	json.direct_message do
		json.extract! @direct_message, :id
		json.users @direct_message.users do |user|
			json.extract! user, :username
		end
		#redundatnt data
	end

	json.users do 
		@direct_message.users.each do |user|
			json.set! user.id do 
				json.extract! user, :id, :username, :email
			end
		end
	end
	# debugger
	json.messages do
		@direct_message.messages.each do |message|
			json.set! message.id do 
				json.extract! message, :id, :content, :author_id, :author_name, :created_at, :updated_at, :messageable_id, :messageable_type
			end
		end
	end
# end
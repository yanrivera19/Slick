json.extract! channel, :id, :name, :description, :owner_id

json.users do 
	channel.users.each do |user|
		json.set! user.id do 
			json.extract! user, :id, :username, :email
		end
	end
end
json.seen_last_message do
	@channel.seen_last_message.each do |user_id|
		json.set! user_id[0], user_id[1]
	end
end	
json.messages do
	channel.messages.each do |message|
		json.set! message.id do 
			json.extract! message, :id, :content, :author_id, :author_name, :created_at, :updated_at, :messageable_id, :messageable_type, :edited
		end
	end
end


json.extract! @direct_message, :id
json.users @direct_message.users do |user|
	json.extract! user, :id, :username, :email
end
json.seen_last_message do
	@direct_message.seen_last_message.each do |user_id|
		json.set! user_id, user_id
	end
end	
	json.messages do
		@direct_message.messages.each do |message|
			json.set! message.id do 
				json.extract! message, :id, :content, :author_id, :author_name, :created_at, :updated_at, :messageable_id, :messageable_type, :edited
			end
		end
	end
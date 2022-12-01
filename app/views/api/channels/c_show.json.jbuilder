json.extract! @channel, :id, :name, :description
json.users @channel.users do |user|
	json.extract! user, :id, :username, :email
end
json.messages do
	@channel.messages.each do |message|
		json.set! message.id do 
			json.extract! message, :id, :content, :author_id, :author_name, :created_at, :updated_at, :messageable_id, :messageable_type, :edited
		end
	end
end

json.users do
  @users.each do |user| 
		json.extract! user, :id, :email, :username, :created_at
	end
end
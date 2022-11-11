
json.users do 
	@users.each do |user|
		json.set! user.id do 
			json.extract! user, :id, :email, :username, :created_at
		end
	end
end

json.workspaces do 
	@users.each do |user|
		user.workspaces do |workspace|
			json.set! workspace.id do 
				json.extract! workspace, :id, :name, :owner_id
			end
		end
	end
end


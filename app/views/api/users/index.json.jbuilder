
# json.users do
# 	debugger
#   @users.each do |user| 
# 		json.extract! user, :id, :email, :username, :created_at
# 		json.workspaces do 
# 			user.workspaces do |workspace|
# 				json.extract! workspace, :id, :name, :owner_id
# 			end
# 		end
# 	end
# end

json.users do 
	@users.each do |user|
		json.set! user.id do 
			json.extract! user, :id, :email, :username, :created_at
			user.workspaces do |workspace|
				json.extract! workspace, :id, :name, :owner_id
			end
		end
	end
end


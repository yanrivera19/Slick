json.user do
  json.extract! @user, :id, :email, :username, :created_at, :updated_at

	json.workspaces @user.workspaces do |workspace|
			json.extract! workspace, :id, :name, :owner_id
			
			json.users workspace.users do |user|
				json.extract! user, :id, :email, :username
			end
	end
end
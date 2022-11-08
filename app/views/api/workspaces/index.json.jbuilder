
  @workspaces.each do |workspace|
		json.set! workspace.id do 
			json.extract! workspace, :id, :name, :owner_id
	  	json.members workspace.users.size
		end
	
	end
			

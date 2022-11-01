json.users do
  json.extract! @users, :id, :email, :username, :created_at
end
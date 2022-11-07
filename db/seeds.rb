# require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
  puts "Destroying tables..."

  User.destroy_all
	Workspace.destroy_all 
	WorkspaceSubscription.destroy_all 
	Message.destroy_all 
	DirectMessage.destroy_all 
	DirectMessageSubscription.destroy_all 
	Channel.destroy_all 
	ChannelSubscription.destroy_all 

  puts "Resetting primary keys..."

  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."

  u1 = User.create!(
    username: 'Tyler Durden', 
    email: 'tylerD@gmail.com', 
    password: 'password'
  )

	u2 = User.create!(
    username: 'Randle McMurphy', 
    email: 'randiemcm@gmail.com', 
    password: 'password'
  )

	u3 = User.create!(
    username: 'Samwise Gamgee', 
    email: 'samwise@gmail.com', 
    password: 'password'
  )

	u4 = User.create!(
    username: 'Jules Winnfield', 
    email: 'julesWin@gmail.com', 
    password: 'password'
  )

	u5 = User.create!(
    username: 'Demo User', 
    email: 'demo-user@gmail.com', 
    password: 'password'
  )

	ApplicationRecord.connection.reset_pk_sequence!('workspaces')

	puts "creating workspaces"

	w1 = Workspace.create!(
		name: "Fight Club",
		owner_id: u1.id
	)

	ApplicationRecord.connection.reset_pk_sequence!('workspace_subscriptions')

  puts "Creating workspace subscriptions..."

	ws1 = WorkspaceSubscription.create!(
		user_id: u1.id,
		workspace_id: w1.id
	)

	ws2 = WorkspaceSubscription.create!(
		user_id: u2.id,
		workspace_id: w1.id
	)

	ws3 = WorkspaceSubscription.create!(
		user_id: u3.id,
		workspace_id: w1.id
	)

	ws4 = WorkspaceSubscription.create!(
		user_id: u4.id,
		workspace_id: w1.id
	)

	ws5 = WorkspaceSubscription.create!(
		user_id: u5.id,
		workspace_id: w1.id
	)

	ApplicationRecord.connection.reset_pk_sequence!('channels')

	puts "creating channels"

	c1 = Channel.create!(
		name: "general",
		workspace_id: w1.id,
		owner_id: u1.id,
		description: "lol"
	)

	c2 = Channel.create!(
		name: "serious business",
		workspace_id: w1.id,
		owner_id: u1.id,
		description: "wuu"
	)

	ApplicationRecord.connection.reset_pk_sequence!('channel_subscriptions')

  puts "Creating channel subscriptions..."

	cs1 = ChannelSubscription.create!(
		user_id: u1.id,
		channel_id: c1.id
	)

	cs2 = ChannelSubscription.create!(
		user_id: u2.id,
		channel_id: c1.id
	)

	cs3 = ChannelSubscription.create!(
		user_id: u3.id,
		channel_id: c1.id
	)

	cs4 = ChannelSubscription.create!(
		user_id: u4.id,
		channel_id: c1.id
	)

	cs5 = ChannelSubscription.create!(
		user_id: u1.id,
		channel_id: c2.id
	)

	cs6 = ChannelSubscription.create!(
		user_id: u2.id,
		channel_id: c2.id
	)

	cs7 = ChannelSubscription.create!(
		user_id: u3.id,
		channel_id: c2.id
	)

	cs8 = ChannelSubscription.create!(
		user_id: u4.id,
		channel_id: c2.id
	)

	cs8 = ChannelSubscription.create!(
		user_id: u4.id,
		channel_id: c1.id
	)

	cs9 = ChannelSubscription.create!(
		user_id: u5.id,
		channel_id: c2.id
	)

	cs10 = ChannelSubscription.create!(
		user_id: u5.id,
		channel_id: c1.id
	)

	ApplicationRecord.connection.reset_pk_sequence!('direct_messages')

	puts "creating direct_messages"

	dm1 = DirectMessage.create!(
		workspace_id: w1.id
	)

	ApplicationRecord.connection.reset_pk_sequence!('direct_message_subscriptions')

  puts "Creating direct message subscriptions..."

	dms1 = DirectMessageSubscription.create!(
		user_id: u1.id,
		direct_message_id: dm1.id
	)

	dms2 = DirectMessageSubscription.create!(
		user_id: u2.id,
		direct_message_id: dm1.id
	)

	dms3 = DirectMessageSubscription.create!(
		user_id: u3.id,
		direct_message_id: dm1.id
	)

	dms4 = DirectMessageSubscription.create!(
		user_id: u4.id,
		direct_message_id: dm1.id
	)

	dms5 = DirectMessageSubscription.create!(
		user_id: u5.id,
		direct_message_id: dm1.id
	)

	ApplicationRecord.connection.reset_pk_sequence!('messages')

	puts "creating messages"

	m1 = Message.create!(
		author_id: u1.id,
		author_name: u1.username,
		content: "Are you guys excited for tomorrow?",
		messageable_id: c1.id,
		messageable_type: "Channel"
	)

	m2 = Message.create!(
		author_id: u2.id,
		author_name: u2.username,
		content: "Oh yeah!",
		messageable_id: c1.id,
		messageable_type: "Channel"
	)

	m3 = Message.create!(
		author_id: u3.id,
		author_name: u3.username,
		content: u3.username,
		messageable_id: c1.id,
		messageable_type: "Channel"
	)

	m4 = Message.create!(
		author_id: u4.id,
		author_name: u4.username,
		content: "I'm gonna have to pass guys. Something came up.",
		messageable_id: c1.id,
		messageable_type: "Channel"
	)

	m5 = Message.create!(
		author_id: u1.id,
		author_name: u1.username,
		content: "Yo guys",
		messageable_id: dm1.id,
		messageable_type: "DirectMessage"
	)

	m6 = Message.create!(
		author_id: u2.id,
		author_name: u2.username,
		content: "Wut?",
		messageable_id: dm1.id,
		messageable_type: "DirectMessage"
	)

	m7 = Message.create!(
		author_id: u3.id,
		author_name: u3.username,
		content: "Sup",
		messageable_id: dm1.id,
		messageable_type: "DirectMessage"
	)



  # 10.times do 
  #   User.create!({
  #     username: Faker::Internet.unique.username(specifier: 3),
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }) 
  # end
	# User.first.workspaces << Workspace.first

	# Workspace.first.channels << Channel.first

	# Workspace.first.direct_messages << DirectMessage.first
	
	

  puts "Done!"
end
class Workspace < ApplicationRecord
	validates :name, presence: true, uniqueness: {scope: :owner_id}

	# after_initialize :generate_default_channels
	

	# def generate_default_channels
	# 	Channel.create(name: "general", workspace_id: self.id)
	# end

	has_many :workspace_subscriptions,
	dependent: :destroy

	has_many :users,
	through: :workspace_subscriptions,
	source: :user,
	dependent: :destroy

	has_many :channels,
	dependent: :destroy

	has_many :direct_messages,
	dependent: :destroy

	belongs_to :owner,
	foreign_key: :owner_id,
	class_name: :User
	
end

class DirectMessage < ApplicationRecord
	belongs_to :workspace
	
	has_many :direct_message_subscriptions,
	dependent: :destroy

	has_many :users,
	through: :direct_message_subscriptions,
	source: :user,
	dependent: :destroy

	has_many :messages,
	as: :messageable,
	dependent: :destroy
end

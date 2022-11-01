class Channel < ApplicationRecord
  belongs_to :workspace
  belongs_to :owner,
	foreign_key: :owner_id,
	class_name: :User

	has_many :channel_subscriptions,
	dependent: :destroy

	has_many :users,
	through: :channel_subscriptions,
	source: :user,
	dependent: :destroy

	has_many :messages,
	as: :messageable,
	dependent: :destroy
end

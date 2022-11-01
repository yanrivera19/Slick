class DirectMessageSubscription < ApplicationRecord
	belongs_to :user
	belongs_to :direct_message
end

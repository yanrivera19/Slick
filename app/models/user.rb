class User < ApplicationRecord
	has_secure_password

	validates :username, uniqueness: true
	validates :email, length: { in: 3..255 }, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, message: ": It looks like that isn't a valid email address" }, presence: true, uniqueness: true
	validates :password_digest, presence: true
	validates :session_token, presence: true, uniqueness: true
	validates :password, length: {in: 6..255}, allow_nil: true
	before_validation :ensure_session_token

	has_many :messages,
	foreign_key: :author_id,
	class_name: :Message,
	dependent: :destroy

	has_many :workspace_subscriptions,
	dependent: :destroy

	has_many :direct_message_subscriptions,
	dependent: :destroy

	has_many :channel_subscriptions,
	dependent: :destroy

	has_many :direct_messages,
	through: :direct_message_subscriptions,
	source: :direct_message,
	dependent: :destroy

	has_many :workspaces,
	through: :workspace_subscriptions,
	source: :workspace,
	dependent: :destroy

	has_many :channels,
	through: :channel_subscriptions,
	source: :channel,
	dependent: :destroy

	has_many :owned_workspaces,
	foreign_key: :owner_id,
	class_name: :Workspace,
	dependent: :destroy

	has_many :owned_channels,
	foreign_key: :owner_id,
	class_name: :Channel,
	dependent: :destroy

	def self.find_by_credentials(email, password) 
		user = User.find_by_email(email)	
		
		if user&.authenticate(password)
			user
		else
			nil
		end
	end

	def reset_session_token!
		self.session_token = generate_unique_session_token
		self.save! 
		self.session_token
	end

private
	def generate_unique_session_token
			while true
				session_token = SecureRandom::urlsafe_base64(16)
				return session_token unless User.exists?(session_token: session_token)
			end
	end

	def ensure_session_token
		self.session_token ||= generate_unique_session_token
	end
end
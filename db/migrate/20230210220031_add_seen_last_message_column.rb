class AddSeenLastMessageColumn < ActiveRecord::Migration[7.0]
  def change
		add_column :channels, :seen_last_message, :jsonb, default: {}
  end
end

class AddSeenLastColumnDm < ActiveRecord::Migration[7.0]
  def change
		add_column :direct_messages, :seen_last_message, :jsonb, default: {}
  end
end

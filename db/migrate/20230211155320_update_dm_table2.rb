class UpdateDmTable2 < ActiveRecord::Migration[7.0]
  def change
		remove_column :direct_messages, :seen_last_message
  end
end

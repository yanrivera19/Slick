class UpdateChannelsTable2 < ActiveRecord::Migration[7.0]
  def change
		remove_column :channels, :seen_last_message
  end
end

class Updatemessages < ActiveRecord::Migration[7.0]
  def change
		rename_column :messages, :author, :author_name
  end
end

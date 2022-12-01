class UpdateMessagesAddEdited < ActiveRecord::Migration[7.0]
  def change
		add_column :messages, :edited, :boolean, null: false, default: false
  end
end

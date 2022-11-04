class UpdateMessages < ActiveRecord::Migration[7.0]
  def change
		add_column :messages, :author, :string, null: false, index: {unique: true}
  end
end

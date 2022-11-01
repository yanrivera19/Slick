class CreateDirectMessageSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :direct_message_subscriptions do |t|
			t.references :user, null: false, foreign_key: true
			t.references :direct_message, null: false, foreign_key: true
      t.timestamps
    end
  end
end

class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :content, null: false
      t.references :author, null: false, foreign_key: {to_table: :users}
      t.references :messageable, polymorphic: true, null: false

      t.timestamps
    end
  end
end

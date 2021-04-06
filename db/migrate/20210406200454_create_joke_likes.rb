class CreateJokeLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :joke_likes do |t|
      t.references :joke, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

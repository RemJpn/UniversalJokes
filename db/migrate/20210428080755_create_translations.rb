class CreateTranslations < ActiveRecord::Migration[6.0]
  def change
    create_table :translations do |t|
      t.text :content
      t.references :joke, null: false, foreign_key: true
      t.references :language, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

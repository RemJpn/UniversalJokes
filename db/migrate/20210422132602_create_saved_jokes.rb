class CreateSavedJokes < ActiveRecord::Migration[6.0]
  def change
    create_table :saved_jokes do |t|
      t.user :references
      t.joke :references

      t.timestamps
    end
  end
end

class CreateDefinitions < ActiveRecord::Migration[5.1]
  def change
    create_table :definitions do |t|
      t.text :body
      t.integer :version
      t.belongs_to :term, foreign_key: true
      t.integer :added_by

      t.timestamps
    end
  end
end

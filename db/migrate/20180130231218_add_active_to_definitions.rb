class AddActiveToDefinitions < ActiveRecord::Migration[5.1]
  def change
    add_column :definitions, :active, :boolean, default: true
  end
end

class CreateModelsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :models do |t|
      t.string :name, null: false
      t.string :scale, null: false
      t.string :source
      t.text :description
      t.integer :length
      t.integer :width
      t.integer :height
      t.belongs_to :modeler

      t.timestamps
    end
  end
end

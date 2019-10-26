class SubmissionsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :submissions do |t|
      t.string :name
      t.string :modeler_first_name
      t.string :modeler_last_name
      t.string :modeler_email
      t.string :modeler_phone
      t.string :scale
      t.string :source
      t.integer :length
      t.integer :width
      t.integer :height
      t.text :description

      t.timestamps
    end
  end
end

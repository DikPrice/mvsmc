class SubmissionsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :submissions do |t|
      t.string :name, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email
      t.string :phone
      t.string :scale, null: false
      t.string :source
      t.integer :length
      t.integer :width
      t.integer :height
      t.text :description

      t.timestamps
    end
  end
end

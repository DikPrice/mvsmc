class CreateModelers < ActiveRecord::Migration[5.2]
  def change
    create_table :modelers do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :phone
      t.string :email
      t.integer :role, default: 1      
    end
  end
end

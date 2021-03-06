class CustomizeUserTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :username, :string, null: true
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_column :users, :phone, :string
    add_column :users, :role, :integer, default: 1
  end
end

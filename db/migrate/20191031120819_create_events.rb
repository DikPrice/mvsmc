class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string  :name, null: false
      t.string  :venue, null: false
      t.text  :description
      t.string :address
      t.string  :city, null: false
      t.string  :state
      t.string  :zip
      t.date  :start_date, null: false
      t.date  :end_date

      t.timestamps
    end
  end
end

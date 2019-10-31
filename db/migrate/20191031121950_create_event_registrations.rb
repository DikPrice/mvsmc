class CreateEventRegistrations < ActiveRecord::Migration[5.2]
  def change
    create_table :event_registrations do |t|
      t.belongs_to :event
      t.belongs_to  :model

      t.timestamps
    end
  end
end

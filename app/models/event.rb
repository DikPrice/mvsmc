class Event < ApplicationRecord
  validates :name, presence: true
  validates :venue, presence: true
  validates :city, presence: true
  validates :start_date, presence: true

  has_many  :event_registrations
  has_many  :models, through: :event_registrations
end

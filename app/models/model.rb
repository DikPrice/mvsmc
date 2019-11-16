class Model < ApplicationRecord
  validates :name, presence: true
  validates :scale, presence: true

  belongs_to :modeler
  has_many  :event_registrations, dependent: :destroy
  has_many  :events, through: :event_registrations
end

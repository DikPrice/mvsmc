class Modeler < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :models

  belongs_to :user, optional: true
end

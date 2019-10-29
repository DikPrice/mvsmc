class Model < ApplicationRecord
  validates :name, presence: true
  validates :scale, presence: true

  belongs_to :user
end

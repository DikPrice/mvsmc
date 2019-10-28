class Submission < ApplicationRecord

  validates :name, presence: true
  validates :scale, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

end

class User < ApplicationRecord
  before_create :cap_names
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :modeler

private

  def cap_names
     self.first_name = self.first_name.capitalize()
     self.last_name = self.last_name.capitalize()
  end
end

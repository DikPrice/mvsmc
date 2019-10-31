class EventRegistration < ApplicationRecord

  belongs_to :model
  belongs_to :event 

end

class Modeler

  attr_reader :first_name, :last_name, :phone, :email

  def initialize(entry)
    @first_name = entry["modeler_first_name"]
    @last_name = entry["modeler_last_name"]
    @phone = entry["modeler_phone"]
    @email = entry["modeler_email"]
  end

end

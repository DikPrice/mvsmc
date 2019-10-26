require_relative "../../lib/shipmodel"

class ImportsController < ApplicationController

 def index
   imported_data = Import.read_file('model_data.csv')

   @completed_imports = []
   imported_data.each do |data|
     ship = ShipModel.new(data, "import")
     new_model = Submission.new(
       name: ship.name,
       scale: ship.scale,
       source: ship.source,
       description: ship.description,
       length: ship.length,
       width: ship.width,
       height: ship.height,
       first_name: data["modeler_first_name"],
       last_name: data["modeler_last_name"],
       phone: data["modeler_phone"],
       email: data["modeler_email"]
     )
     new_model.save
     @completed_imports << new_model
   end
 end

end

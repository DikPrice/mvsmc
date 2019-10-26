require_relative "../../lib/shipmodel"

class ImportsController < ApplicationController

 def index
   imported_data = Import.read_file('model_data.csv')
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
       modeler_first_name: data["modeler_first_name"],
       modeler_last_name: data["modeler_last_name"],
       modeler_phone: data["modeler_phone"],
       modeler_email: data["modeler_email"]
     )
     new_model.save

   end
 end

end

require_relative "../../lib/shipmodel"

class ImportsController < ApplicationController

  def index
    @complete_model_imports = []
    @complete_modeler_imports = []

    def import_models
      imported_model_data = Import.read_file('model_data.csv')

      imported_model_data.each do |data|
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
        @complete_model_import << new_model
      end
    end

    def import_modelers
      imported_modeler_data = Import.read_file('user_data.csv')
      imported_modeler_data.each do |modeler|
        if modeler_email["email"].nil?
          modeler["email"] = "n/a"
        end
        if modler["phone"].nil?
          modeler["phone"] = "n/a"
        end
        new_user = Modeler.new(
          first_name: modeler["first_name"],
          last_name: modeler["last_name"],
          email: modeler["email"],
          phone: modeler["phone"],
          role: 1,
        )
        new_modeler.save
        @complete_modeler_imports << user
      end
    end

    import_models()
    import_modellers()

  end
end

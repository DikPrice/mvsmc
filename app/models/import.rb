require 'csv'

class Import
  IMPORT_PATHNAME = Rails.root.to_s + ("/import_files/")

  def self.read_file(file_name)
    file_name = IMPORT_PATHNAME + file_name
    data = []
    CSV.foreach(file_name, headers: true) do |row|
      data << row
    end
    data
  end

  def self.import_models
    complete_model_imports = []
    imported_model_data = read_file('model_data.csv')
    imported_model_data.each do |data|
      description = ShipModel.merge_paragraphs(data)
      scale = ShipModel.add_scale_if_missing(data["model_scale"])
      new_model = Submission.new(
        name: data["model_name"],
        scale: scale,
        source: data["model_source"],
        description: description,
        length: data["model_length"],
        width: data["model_width"],
        height: data["model_height"],
        first_name: data["modeler_first_name"],
        last_name: data["modeler_last_name"],
        phone: data["modeler_phone"],
        email: data["modeler_email"]
      )
      new_model.save
      complete_model_imports << new_model
    end
    complete_model_imports
  end

  def self.import_modelers
    complete_modeler_imports = []
    imported_modeler_data = read_file('user_data.csv')
    imported_modeler_data.each do |modeler|
      if modeler["email"].nil?
        modeler["email"] = "n/a"
      end
      if modeler["phone"].nil?
        modeler["phone"] = "n/a"
      end
      new_modeler = Modeler.new(
        first_name: modeler["first_name"],
        last_name: modeler["last_name"],
        email: modeler["email"],
        phone: modeler["phone"],
        role: 1
      )
      new_modeler.save
      complete_modeler_imports << new_modeler
    end
    complete_modeler_imports
  end

end

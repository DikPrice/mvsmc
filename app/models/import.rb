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
    users = create_user_set(imported_modeler_data)

    users.each do |user|
      new_modeler = Modeler.new(user)
      new_modeler.save
      complete_modeler_imports << new_modeler
    end
    complete_modeler_imports
    # Only include in development
    # write_user_to_file(complete_modeler_imports)
  end

  def self.create_user_set(imported_data)
    user_set = []
    imported_data.each do |user|
      if user["email"].nil?
        user["email"] = "n/a"
      end
      if user["phone"].nil?
        user["phone"] = "n/a"
      end

      user_details = {
        first_name: user["first_name"],
        last_name: user["last_name"],
        email: user["email"],
        phone: user["phone"],
      }
      user_set << user_details
    end
    user_set
  end

  def self.write_user_to_file(users)
    CSV.open("#{IMPORT_PATHNAME}/user_seed_file.csv", "wb") do |entry|
      users.each do |user|
        if (user.email != "n/a")
          entry << ['User.create(']
          entry << ["  email: \"#{user.email}\","]
          entry << ["  username: \"\","]
          entry << ["  first_name: \"#{user.first_name}\","]
          entry << ["  last_name: \"#{user.last_name}\","]
          entry << ['  password: "password",']
          entry << ['  password_confirmation: "password",']
          entry << ['  role: 2,']
          entry << [')']
        end
      end
    end
  end

end

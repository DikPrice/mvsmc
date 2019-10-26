class ShipModel

  attr_reader :name, :scale, :source, :description, :length, :width, :height

  def initialize(entry, source)
    if source != "import" || entry["model_description_2"].nil?
      description = entry["model_description_1"]
    else
      para1 = entry["model_description_1"]
      para2 = entry["model_description_2"]
      para3 = entry["model_description_3"]
      if entry["model_description_3"].nil?
        description = "#{para1}\n#{para2}"
      else
        description = "#{para1}\n#{para2}\n#{para3}"
      end
    end
    @name = entry["model_name"]
    @scale = entry["model_scale"]
    @source = entry["model_source"]
    @description = description
    @length =  entry["model_length"]
    @width =  entry["model_width"]
    @height =  entry["model_height"]
  end

end

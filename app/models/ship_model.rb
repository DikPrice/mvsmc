class ShipModel

  attr_reader :name, :scale, :source, :description, :length, :width, :height

  def self.merge_paragraphs(entry)
    if entry["model_description_2"].nil?
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
  end

  def self.add_scale_if_missing(scale)
    if scale.nil?
      scale = "Not to scale"
    end
    scale
  end

end

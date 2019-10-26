require 'csv'
require 'pry'
require_relative "../../lib/shipmodel"
require_relative "../../lib/modeler"

class Import < ApplicationRecord

  IMPORT_PATHNAME = "/Users/richardprice/challenges/BreakableToy/mvsmc/import_files/"

  def self.read_file(file_name)
    file_name = IMPORT_PATHNAME + file_name
    data = []
    CSV.foreach(file_name, headers: true) do |row|
      data << row
    end
    data
  end

  def self.find_models(data, type)
    ships = []
    data.each do |entry|
      ship = ShipModel.new(entry, type)
      ships << ship
    end
    ships
  end

  def self.find_modelers(data)
    modelers = []
    data.each do |entry|
      modeler = Modeler.new(entry)
      modelers << modeler
    end
    modelers
  end

end

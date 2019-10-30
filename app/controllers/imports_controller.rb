class ImportsController < ApplicationController

  def index
    @complete_model_imports = Import.import_models()
    # @complete_modeler_imports = Import.import_modelers()

  end

end

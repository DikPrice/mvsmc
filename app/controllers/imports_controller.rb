class ImportsController < ApplicationController
  before_action :authorize_user

  def index
    @complete_model_imports = Import.import_models()
    @complete_modeler_imports = Import.import_modelers()
  end

  protected

  def authorize_user
    if !user_signed_in? || current_user.role != 3
      raise ActionController::RoutingError.new("Must be an Admin")
    end
  end
end

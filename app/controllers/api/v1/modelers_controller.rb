class Api::V1::ModelersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    modeler = Modeler.find(params["id"])
    render json: { modeler: modeler }
  end

  def create
    modeler = Modeler.find_by(
      first_name: modeler_params["first_name"],
      last_name: modeler_params["last_name"]
    )
    if modeler.nil?
      modeler = Modeler.new(
        first_name: modeler_params["first_name"],
        last_name: modeler_params["last_name"],
        phone: modeler_params["phone"],
        email: modeler_params["email"],
        role: 1
      )

      if modeler.save
        render json: { result: modeler}
      else
        render json: { result: modeler.errors}
      end
    else
      render json: { result: modeler}
    end
  end

  private

  def modeler_params
    params.require(:modeler).permit(
      :first_name,
      :last_name,
      :phone,
      :email
    )
  end
end

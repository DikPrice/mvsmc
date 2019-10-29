class Api::V1::ModelsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }


  private

  def model_params
    params.require(:submission).permit(
      :name,
      :scale,
      :source,
      :description
    )
end

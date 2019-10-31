class Api::V1::EventRegistrationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create

    registration_exists = EventRegistration.find_by(
      event_id: registration_params[:event_id],
      model_id: registration_params[:model_id]
    )
    if registration_exists.nil?
      registration = EventRegistration.new(
        event_id: registration_params[:event_id],
        model_id: registration_params[:model_id]
      )
      if registration.save
        render json: { result: registration}
      else
        render json: { result: registration.errors}
      end
    else
      render json: { result: "model is already registered"}
    end
  end

  private

  def registration_params
    params.require(:event_registration).permit(
      :event_id,
      :model_id
    )
  end

end

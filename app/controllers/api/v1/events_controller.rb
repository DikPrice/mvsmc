class EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      user = current_user
    end
    event_list = Event.all
    render json: { event: event_list, user: user }
  end

  def show
  end

  def create
  end

  private

  def event_params
    params.require(:event).permit(
      :name,
      :venue,
      :description,
      :address,
      :city,
      :state,
      :zip,
      :start_date,
      :end_date
    )
  end

end

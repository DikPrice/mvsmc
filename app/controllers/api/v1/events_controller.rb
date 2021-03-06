class Api::V1::EventsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      user = current_user
    end

    event_list = Event.all
    if event_list.empty?
      message= 'No events listed'
      render json: { events: [{id: 1, name: message}], user: user }
    else
      render json: { events: event_list, user: user }
    end
  end

  def show
    if current_user
      user = current_user
    end
    event = Event.find(params["id"])
    start_date = event.start_date.strftime("%A, %d %b")
    end_date = event.end_date.strftime("%A, %d %b")

    render json: {
      event: event,
      dates: {start_date: start_date, end_date: end_date},
      user: user
     }
  end

  def create
    event_exists = Event.find_by(
      name: event_params["name"],
      start_date: event_params["start_date"]
    )

    if event_exists.nil?
      new_event = Event.new(event_params)
      if new_event.save
        render json: { result: new_event, duplicate: 0 }
      else
        render json: { result: new_event.errors, duplicate: 0 }
      end
    else
      render json: { result: "duplicate", duplicate: event_exists }
    end
  end

  def update
    event_update = Event.find(params["id"])
    if event_update.update(event_params)
      render json: event_update
    else
      render json: event_update.errors
    end
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

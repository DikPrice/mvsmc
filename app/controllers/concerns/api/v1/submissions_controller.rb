class Api::V1::SubmissionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Submission.all
  end

  def show
    render json: Submission.find(params["id"])
  end

end

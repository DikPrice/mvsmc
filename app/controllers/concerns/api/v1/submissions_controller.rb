class Api::V1::SubmissionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Submission.all
  end

  def show
    render json: Submission.find(params["id"])
  end

  def create

    model_exists = Submission.find_by(
      name: params["name"],
      scale: params["scale"],
      first_name: params["firstname"],
      last_name: params["lastname"]
    )

    if model_exists.nil?
      new_submission = Submission.new(submission_params)
      new_submission.update(
        first_name: params["firstname"],
        last_name: params["lastname"]
      )

      if new_submission.save
        render json: { result: new_submission, duplicate: 0}
      else
        render json: { result: new_submission.errors, duplicate: 0 }
      end
    else
      render json: { result: "duplicate", duplicate: model_exists }
    end
  end

  private

  def submission_params
    params.require(:submission).permit(
      :name,
      :scale,
      :source,
      :description,
      :length, :width, :height,
      :first_name, :last_name,
      :phone,
      :email
    )
  end

end

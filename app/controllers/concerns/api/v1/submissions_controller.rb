class Api::V1::SubmissionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      user_id = current_user.id
    end
    
    model_list = []
    unsorted_submissions = Submission.all

    if (params["sort"] == "mymodels")
      model_list = Submission.where(first_name: current_user[:first_name], last_name: current_user[:last_name])
    elsif (params["sort"] == "models")
      model_list = unsorted_submissions.sort_by{ |value| value[:name] }
    elsif (params["sort"] == "modelers")
      model_list = unsorted_submissions.sort_by{ |value| value[:last_name] }
    else
      model_list =unsorted_submissions
    end

    render json: { models: model_list, user_id: user_id }
  end

  def show
    if current_user
      user_details = User.find(current_user.id)
    end
    model = Submission.find(params["id"])
    render json: { model: model, user: user_details }
  end

  def create
    model_exists = Submission.find_by(
      name: submission_params["name"],
      scale: submission_params["scale"],
      first_name: submission_params["first_name"],
      last_name: submission_params["last_name"]
    )

    if model_exists.nil?
      new_submission = Submission.new(submission_params)

      if new_submission.save
        render json: { result: new_submission, duplicate: 0 }
      else
        render json: { result: new_submission.errors, duplicate: 0 }
      end
    else
      render json: { result: "duplicate", duplicate: model_exists }
    end
  end

  def update
    edit_submission = Submission.find(params["id"])
    if edit_submission.update(submission_params)
      render json: edit_submission
    else
      render json: edit_submisison.errors
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
      :email,
      :review
    )
  end

end

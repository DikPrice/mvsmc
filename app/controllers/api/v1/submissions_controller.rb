class Api::V1::SubmissionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if (current_user)
      if (params["sort"])
        model_list = Submission.get_model_list(params["sort"], current_user)
        render json: { models: model_list, user: current_user }
      elsif (params["count"])
        model_count = Submission.get_model_count(params["statusCount"], current_user)
        render json: { models: model_count, user: current_user }
      else
        model_list = Submission.all
        render json: { models: model_list, user: current_user }
      end
    else
      render json: { models: "Not available" }
    end
  end

  def show
    if current_user
      user_details = User.find(current_user.id)
    end
    model = Submission.find(params["id"])
    created_est = model.created_at - (5*3600)
    updated_est = model.updated_at - (5*3600)
    created = created_est.strftime("%A, %d %b %Y %l:%M %p")
    updated = updated_est.strftime("%A, %d %b %Y %l:%M %p")

    render json: {
      model: model,
      timestamps: {created: created, updated: updated},
      user: user_details
    }
  end

  def create
    cap_first_name = submission_params["first_name"].capitalize()
    cap_last_name = submission_params["last_name"].capitalize()

    model_exists = Submission.find_by(
      name: submission_params["name"],
      scale: submission_params["scale"],
      first_name: cap_first_name,
      last_name: cap_last_name
    )

    if model_exists.nil?
      new_submission = Submission.new(submission_params)
      new_submission.first_name =cap_first_name
      new_submission.last_name =  cap_last_name
binding.pry
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
      render json: { result: edit_submission }
    else
      render json: { result: edit_submisison.errors }
    end
  end

  def destroy
    submissionToDelete = Submission.find(params["id"])
    if (current_user.role >= 3)
      if submissionToDelete.delete
        render json: { result: "Deleted" }
      else
        render json: { result: submissionToDelete.errors }
      end
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

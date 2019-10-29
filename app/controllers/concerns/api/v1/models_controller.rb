class Api::V1::ModelsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    model_exists = Model.find_by(
      name: model_params["name"],
      scale: model_params["scale"],
      user_id: model_params["user_id"],
    )

    if model_exists.nil?
      new_model = Model.new(model_params)
      matching_submission = Submission.find(model_params[:id])

      if new_model.save
        matching_submission.delete
        render json: { result: new_model, duplicate: 0 }

      else
        render json: { result: new_model.errors, duplicate: 0 }
      end
    else
      render json: { result: "duplicate", duplicate: model_exists }
    end
  end

  private

  def model_params
    params.require(:model).permit(
      :id,
      :name,
      :scale,
      :source,
      :description,
      :length,
      :width,
      :height,
      :user_id
    )
  end
end

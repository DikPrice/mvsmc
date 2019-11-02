class Api::V1::ModelsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      user = current_user
    end

    model_list = []

    if (params["event_id"])
      unsorted_models = Event.find(params["event_id"]).models
    elsif (params["sort"] == "mymodels")
      unsorted_models = Model.where(modeler_id: user[:id])
    else
      unsorted_models = Model.all
    end

    if (params["sort"] == "models")
      model_list = unsorted_models.sort_by{ |value| value[:name] }
    elsif (params["sort"] == "modelers")
      model_list = unsorted_models.sort_by{ |value| value[:last_name] }
    else
      model_list =unsorted_models
    end

    if model_list.empty?
      model_list << {name: "No models found"}
    end

    render json: { models: model_list, user: user }
  end

  def show
    if current_user
      user = current_user
    end

    model = Model.find(params["id"])
    modeler = model.modeler
    render json: { model: model, modeler: modeler , user: user}
  end

  def create
    modeler = Modeler.find_by(
      first_name: params["first_name"],
      last_name: params["last_name"]
    )
    if modeler.nil?
      modeler = Modeler.create(
        first_name: params["first_name"],
        last_name: params["last_name"],
        email: params["email"],
        phone: params["phone"],
        role: 1
      )
    end
    model_exists = Model.find_by(
      name: model_params["name"],
      scale: model_params["scale"],
      modeler_id: modeler["id"],
    )
    if model_exists.nil?
      new_model = Model.create(
            name: model_params["name"],
            scale: model_params["scale"],
            source: model_params["source"],
            description: model_params["description"],
            length: model_params["length"],
            width: model_params["width"],
            height: model_params["height"],
            modeler_id: modeler[:id]
          )
    else
        render json: { result: "duplicate", duplicate: model_exists }
    end
    matching_submission = Submission.find(model_params[:id])

    if new_model.save
      matching_submission.delete
      render json: { result: new_model, duplicate: 0 }
    else
      render json: { result: new_model.errors, duplicate: 0 }
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
      :height
    )
  end
end

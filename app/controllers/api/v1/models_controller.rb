class Api::V1::ModelsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      user = current_user
    end
    selected_models = []
    model_list = []

    if (params["modeler_id"])
      modeler = Modeler.find_by(email: user.email)
      model_list = Model.where(modeler_id: modeler)
    elsif (params["event_id"])
      selected_models = Event.find(params["event_id"]).models
      model_list = get_unselected_models(selected_models)
    else
      model_list = Model.all
    end

    if (params["sort"] == "models")
      model_list = model_list.sort_by{ |value| value[:name] }
    elsif (params["sort"] == "modelers")
      model_list = model_list.sort_by{ |value| value[:last_name] }
    end

    if model_list.empty?
      model_list << {id: 1, name: "No models found"}
    end

    render json: { models: model_list, event_models: selected_models, user: user }
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

  def destroy
    modelToDelete = Model.find(params["id"])
    if (current_user.role >= 3)
      if modelToDelete.delete
        render json: { result: "Deleted" }
      else
        render json: { result: modelToDelete.errors }
      end
    end
  end

  private

  def get_unselected_models(selected_models)
    all_models = Model.all
    unselected_models = all_models.filter do |model|
      if (!selected_models.include?(model))
        model
      end
    end
    return unselected_models
  end

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

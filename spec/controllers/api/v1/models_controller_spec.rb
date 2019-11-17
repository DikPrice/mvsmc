require "rails_helper"

RSpec.describe Api::V1::ModelsController, type: :controller do

  describe "GET#index" do
    let!(:modeler) { FactoryBot.create(:modeler) }
    let!(:model) { FactoryBot.create(:model) }

    context "Anyone asks to see a list of models" do
      it "should return a list of all models" do

        get :index
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 3
        expect(returned_json).to be_kind_of(Hash)

        expect(returned_json["models"][0]["id"]).to eq model.id
        expect(returned_json["models"][0]["name"]).to eq model.name
        expect(returned_json["models"][0]["scale"]).to eq model.scale
        expect(returned_json["models"][0]["source"]).to eq model.source
        expect(returned_json["models"][0]["description"]).to eq model.description
        expect(returned_json["models"][0]["length"]).to eq model.length
        expect(returned_json["models"][0]["width"]).to eq model.width
        expect(returned_json["models"][0]["height"]).to eq model.height
      end
    end
  end

  describe "GET#show" do
    let!(:modeler) { FactoryBot.create(:modeler, id: 2) }
    let!(:model) { FactoryBot.create(:model, modeler_id: 2) }

    context "Anyone asks to see the show page of a model" do
      it "should return a display the correct information" do

        get :show, params: { id: model.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 3
        expect(returned_json).to be_kind_of(Hash)

        expect(returned_json["model"]["id"]).to eq model.id
        expect(returned_json["model"]["name"]).to eq model.name
        expect(returned_json["model"]["scale"]).to eq model.scale
        expect(returned_json["model"]["source"]).to eq model.source
        expect(returned_json["model"]["description"]).to eq model.description
        expect(returned_json["model"]["length"]).to eq model.length
        expect(returned_json["model"]["width"]).to eq model.width
        expect(returned_json["model"]["height"]).to eq model.height
        expect(returned_json["modeler"]["first_name"]).to eq modeler.first_name
        expect(returned_json["modeler"]["last_name"]).to eq modeler.last_name
      end
    end
  end





end

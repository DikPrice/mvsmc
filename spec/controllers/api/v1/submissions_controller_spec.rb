require "rails_helper"

RSpec.describe Api::V1::SubmissionsController, type: :controller do

  describe "GET#index" do
    let!(:test_user) {FactoryBot.create(:user)}
    let!(:submission) { FactoryBot.create(:submission) }

    context "The user asks to see a list of models" do
      it "should return a list of all model submission" do
        sign_in test_user

        get :index
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 2
        expect(returned_json).to be_kind_of(Hash)

        expect(returned_json["models"][0]["id"]).to eq submission.id
        expect(returned_json["models"][0]["name"]).to eq submission.name
        expect(returned_json["models"][0]["scale"]).to eq submission.scale
        expect(returned_json["models"][0]["source"]).to eq submission.source
        expect(returned_json["models"][0]["description"]).to eq submission.description
        expect(returned_json["models"][0]["length"]).to eq submission.length
        expect(returned_json["models"][0]["width"]).to eq submission.width
        expect(returned_json["models"][0]["height"]).to eq submission.height
        expect(returned_json["models"][0]["first_name"]).to eq submission.first_name
        expect(returned_json["models"][0]["last_name"]).to eq submission.last_name
        expect(returned_json["models"][0]["phone"]).to eq submission.phone
        expect(returned_json["models"][0]["email"]).to eq submission.email
      end
    end
  end

  describe "GET#show" do
    let!(:submission) { FactoryBot.create(:submission) }

    context "The user asks to see the show page of a model" do
      it "should return a display the correct information" do

        get :show, params: { id: submission.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json.length).to eq 3
        expect(returned_json).to be_kind_of(Hash)

        expect(returned_json["model"]["id"]).to eq submission.id
        expect(returned_json["model"]["name"]).to eq submission.name
        expect(returned_json["model"]["scale"]).to eq submission.scale
        expect(returned_json["model"]["source"]).to eq submission.source
        expect(returned_json["model"]["description"]).to eq submission.description
        expect(returned_json["model"]["length"]).to eq submission.length
        expect(returned_json["model"]["width"]).to eq submission.width
        expect(returned_json["model"]["height"]).to eq submission.height
        expect(returned_json["model"]["first_name"]).to eq submission.first_name
        expect(returned_json["model"]["last_name"]).to eq submission.last_name
        expect(returned_json["model"]["phone"]).to eq submission.phone
        expect(returned_json["model"]["email"]).to eq submission.email
      end
    end
  end

  describe "POST#create" do
    let!(:new_submission) { {submission: {
      name: "HMS Pinafore",
      scale: "1:700",
      source: "Kit",
      description: "We sail the ocean blue, And our saucy ship's a beauty; We're sober men and true, And attentive to our duty.",
      length: 12,
      width: 8,
      height: 20,
      first_name: "Gilbert",
      last_name: "Sullivan",
      phone: "123 456 7890",
      email:"hellosailor@saucy.com"
    } } }

    context"User completes new submission form correctly" do
      it "should return the newly created submission" do
        current_count = Submission.count

        post :create, params: new_submission, format: :json

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json.length).to eq 2
        expect(Submission.count).to eq(current_count + 1)

        expect(returned_json["result"]["name"]).to eq new_submission[:submission][:name]
        expect(returned_json["result"]["scale"]).to eq new_submission[:submission][:scale]
        expect(returned_json["result"]["first_name"]).to eq new_submission[:submission][:first_name]
        expect(returned_json["result"]["last_name"]).to eq new_submission[:submission][:last_name]
        expect(returned_json["result"]["first_name"]).to eq new_submission[:submission][:first_name]
        expect(returned_json["duplicate"]).to eq 0
      end
    end

    context "User does not complete all of the essential fields" do
      it "should return errors specifying which essential fields are empty" do
        current_count = Submission.count
        improper_submission = {submission: {
          name: "",
          scale: "",
          source: "",
          description: "",
          length: nil,
          width: nil,
          height: nil,
          first_name: "",
          last_name: "",
          phone: "",
          email:""
        } }

        post :create, params: improper_submission, format: :json

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(Submission.count).to eq(current_count)

        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json.length).to eq 2
        expect(returned_json["result"]["name"]).to eq ["can't be blank"]
        expect(returned_json["result"]["scale"]).to eq ["can't be blank"]
        expect(returned_json["result"]["first_name"]).to eq ["can't be blank"]
        expect(returned_json["result"]["last_name"]).to eq ["can't be blank"]
        expect(returned_json["duplicate"]).to eq 0
      end
    end

    context "User submits a correct form with essential fields that match an existing entry" do
      let!(:existing_submission) { FactoryBot.create(:submission) }

      it "should return errors and the existing record" do
        current_count = Submission.count
        duplicate_submission = {submission: {
          name: "HMS Pinafore",
          scale: "1:700",
          source: "Scratch built",
          description: "Some other description",
          length: 10,
          width: 6,
          height: 10,
          first_name: "Gilbert",
          last_name: "Sullivan",
          phone: "1098 765 4321",
          email:"goodbyesailor@saucy.com"
        } }

        post :create, params: duplicate_submission, format: :json

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json.length).to eq 2
        expect(returned_json["result"]).to eq "duplicate"
        expect(returned_json["duplicate"]["name"]).to eq new_submission[:submission][:name]
        expect(returned_json["duplicate"]["first_name"]).to eq new_submission[:submission][:first_name]
        expect(returned_json["duplicate"]["last_name"]).to eq new_submission[:submission][:last_name]
        expect(returned_json["duplicate"]["first_name"]).to eq new_submission[:submission][:first_name]
        expect(returned_json["duplicate"]["description"]).to eq new_submission[:submission][:description]
      end
    end
  end

  describe "PATCH#update" do
    let!(:submission) { FactoryBot.create(:submission) }
    it "should alter an existing record and return the updated data" do
      edited_submission = {
        id: submission.id,
        name: "HMS Pinafore the Second",
        scale: "1\" = 1'",
        source: "Kit",
        description: "We sang ourselves hoarse",
        length: 12,
        width: 8,
        height: 20,
        first_name: "Albert",
        last_name: "Windsor",
        phone: "123 456 7890",
        email:"hellosailor@saucy.com"
      }

      patch :update, params: { submission: edited_submission, id: submission.id },  format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)

      expect(returned_json["result"]["id"]).to eq edited_submission[:id]
      expect(returned_json["result"]["name"]).to eq edited_submission[:name]
      expect(returned_json["result"]["scale"]).to eq edited_submission[:scale]
      expect(returned_json["result"]["source"]).to eq edited_submission[:source]
      expect(returned_json["result"]["description"]).to eq edited_submission[:description]
      expect(returned_json["result"]["length"]).to eq edited_submission[:length]
      expect(returned_json["result"]["width"]).to eq edited_submission[:width]
      expect(returned_json["result"]["height"]).to eq edited_submission[:height]
      expect(returned_json["result"]["first_name"]).to eq edited_submission[:first_name]
      expect(returned_json["result"]["last_name"]).to eq edited_submission[:last_name]
      expect(returned_json["result"]["phone"]).to eq edited_submission[:phone]
      expect(returned_json["result"]["email"]).to eq edited_submission[:email]
    end
  end
end

require "rails_helper"

RSpec.describe Api::V1::SubmissionsController, type: :controller do
  describe "GET#index" do
    it "should return a list of all model submission" do
      FactoryBot.create_list(:submission, 3)
      submission = FactoryBot.create(:submission, name: "Flying Dutchman")

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 4
      expect(returned_json).to be_kind_of(Array)

      expect(returned_json[3]["id"]).to eq submission.id
      expect(returned_json[3]["name"]).to eq submission.name
      expect(returned_json[3]["scale"]).to eq submission.scale
      expect(returned_json[3]["source"]).to eq submission.source
      expect(returned_json[3]["description"]).to eq submission.description
      expect(returned_json[3]["length"]).to eq submission.length
      expect(returned_json[3]["width"]).to eq submission.width
      expect(returned_json[3]["height"]).to eq submission.height
      expect(returned_json[3]["first_name"]).to eq submission.first_name
      expect(returned_json[3]["last_name"]).to eq submission.last_name
      expect(returned_json[3]["phone"]).to eq submission.phone
      expect(returned_json[3]["email"]).to eq submission.email
    end
  end

  describe "POST#create" do
    let! (:new_submission) { {submission: {
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

    it "should return a newly created submission when filled out correctly" do
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

    it "should return errors when filled out incorrectly" do
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

  #   it "should return errors and the existing record if trying to create a duplicate" do
  #     current_count = Submission.count
  #     new_submission = FactoryBot.create(:submission)
  #     duplicate_submission = {submission: {
  #       name: "HMS Pinafore",
  #       scale: "1:700",
  #       source: "SCratch built",
  #       description: "Some other description",
  #       length: 10,
  #       width: 6,
  #       height: 10,
  #       first_name: "Gilbert",
  #       last_name: "Sullivan",
  #       phone: "1098 765 4321",
  #       email:"goodbyesailor@saucy.com"
  #     } }
  #
  #     post :create, params: duplicate_submission, format: :json
  #
  #     # returned_json = JSON.parse(response.body)
  #     # expect(response.status).to eq 200
  #     # expect(response.content_type).to eq("application/json")
  #     #
  #     # expect(returned_json).to be_kind_of(Hash)
  #     # expect(returned_json.length).to eq 2
  #     # expect(returned_json["result"]).to eq ["duplicate"]
  #     # expect(returned_json["duplicate"]["name"]).to eq new_submission[:submission][:name]
  #     # expect(returned_json["duplicate"]["first_name"]).to eq new_submission[:submission][:first_name]
  #     # expect(returned_json["duplicate"]["last_name"]).to eq new_submission[:submission][:last_name]
  #     # expect(returned_json["duplicate"]["first_name"]).to eq new_submission[:submission][:first_name]
  #     # expect(returned_json["duplicate"]["description"]).to eq new_submission[:submission][:description]
  #   end
  end

  # describe "PATCH#update" do
  #   it "should alter an existing record and return the updated data" do
  #     submission = FactoryBot.create(:submission)
  #     edited_submission = {submission: {
  #       id: submission.id,
  #       name: "HMS Pinafore the Second",
  #       scale: "1\" = 1'",
  #       source: "Kit",
  #       description: "We sang ourselves hoarse",
  #       length: 12,
  #       width: 8,
  #       height: 20,
  #       first_name: "Albert",
  #       last_name: "Windsor",
  #       phone: "123 456 7890",
  #       email:"hellosailor@saucy.com"
  #     } }
  #
  #     patch :update, params: edited_submission, format: :json
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq("application/json")
  #     expect(returned_json.length).to eq 1
  #     expect(returned_json).to be_kind_of(Hash)
  #
  #     expect(returned_json[3]["id"]).to eq edited_submission.id
  #     expect(returned_json[3]["name"]).to eq edited_submission.name
  #     expect(returned_json[3]["scale"]).to eq edited_submission.scale
  #     expect(returned_json[3]["source"]).to eq edited_submission.source
  #     expect(returned_json[3]["description"]).to eq edited_submission.description
  #     expect(returned_json[3]["length"]).to eq edited_submission.length
  #     expect(returned_json[3]["width"]).to eq edited_submission.width
  #     expect(returned_json[3]["height"]).to eq edited_submission.height
  #     expect(returned_json[3]["first_name"]).to eq edited_submission.first_name
  #     expect(returned_json[3]["last_name"]).to eq edited_submission.last_name
  #     expect(returned_json[3]["phone"]).to eq edited_submission.phone
  #     expect(returned_json[3]["email"]).to eq edited_submission.email
  #   end
  # end
end

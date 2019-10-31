# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_31_121950) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "event_registrations", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "model_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_registrations_on_event_id"
    t.index ["model_id"], name: "index_event_registrations_on_model_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "name", null: false
    t.string "venue", null: false
    t.text "description"
    t.string "address"
    t.string "city", null: false
    t.string "state"
    t.string "zip"
    t.date "start_date", null: false
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "modelers", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "phone"
    t.string "email"
    t.integer "role", default: 1
  end

  create_table "models", force: :cascade do |t|
    t.string "name", null: false
    t.string "scale", null: false
    t.string "source"
    t.text "description"
    t.integer "length"
    t.integer "width"
    t.integer "height"
    t.bigint "modeler_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["modeler_id"], name: "index_models_on_modeler_id"
  end

  create_table "submissions", force: :cascade do |t|
    t.string "name", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email"
    t.string "phone"
    t.string "scale", null: false
    t.string "source"
    t.integer "length"
    t.integer "width"
    t.integer "height"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "review", default: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.integer "role", default: 1
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end

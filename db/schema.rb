# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_08_131346) do
  create_table "admin_users", force: :cascade do |t|
    t.string "first_name", limit: 25
    t.string "last_name", limit: 50
    t.string "email", default: "", null: false
    t.string "username", limit: 25
    t.string "password_digest"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["username"], name: "index_admin_users_on_username"
  end

  create_table "chronological_times", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "finished_dates", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "keys", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
  end

  create_table "names", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "pitches", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "stops", force: :cascade do |t|
    t.integer "stop_number"
    t.integer "track_id"
    t.integer "stop_time"
    t.string "stop_title"
    t.index ["stop_number"], name: "index_stops_on_stop_number"
  end

  create_table "stops_tracks", id: false, force: :cascade do |t|
    t.integer "stop_id", null: false
    t.integer "track_id", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.string "permalink"
    t.boolean "visible", default: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["name"], name: "index_tags_on_name"
    t.index ["permalink"], name: "index_tags_on_permalink"
  end

  create_table "tags_tracks", force: :cascade do |t|
    t.integer "tag_id"
    t.integer "track_id"
    t.index ["tag_id", "track_id"], name: "index_tags_tracks_on_tag_id_and_track_id"
  end

  create_table "tracks", force: :cascade do |t|
    t.string "name"
    t.date "date_finished"
    t.string "location_finished"
    t.time "length"
    t.string "permalink"
    t.boolean "visible", default: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.float "latitude"
    t.float "longitude"
    t.string "sound_file_name"
    t.string "sound_content_type"
    t.integer "sound_file_size"
    t.datetime "sound_updated_at", precision: nil
    t.string "track_version"
    t.integer "track_number"
    t.float "pitch"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at", precision: nil
    t.float "average_pitch"
    t.time "average_length"
    t.integer "length_sec"
    t.string "textfile_file_name"
    t.string "textfile_content_type"
    t.integer "textfile_file_size"
    t.datetime "textfile_updated_at", precision: nil
    t.index ["name"], name: "index_tracks_on_name"
    t.index ["permalink"], name: "index_tracks_on_permalink"
  end

end

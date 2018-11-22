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

ActiveRecord::Schema.define(version: 20181029210006) do

  create_table "admin_users", force: :cascade do |t|
    t.string   "first_name",      limit: 25
    t.string   "last_name",       limit: 50
    t.string   "email",                      default: "", null: false
    t.string   "username",        limit: 25
    t.string   "password_digest"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.index ["username"], name: "index_admin_users_on_username"
  end

  create_table "chronological_times", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "finished_dates", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "names", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pitches", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stops", force: :cascade do |t|
    t.integer "stop_number"
    t.integer "track_id"
    t.integer "stop_time"
    t.string  "stop_title"
    t.index ["stop_number"], name: "index_stops_on_stop_number"
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.string   "permalink"
    t.boolean  "visible",    default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["name"], name: "index_tags_on_name"
    t.index ["permalink"], name: "index_tags_on_permalink"
  end

  create_table "tags_tracks", force: :cascade do |t|
    t.integer "tag_id"
    t.integer "track_id"
    t.index ["tag_id", "track_id"], name: "index_tags_tracks_on_tag_id_and_track_id"
  end

  create_table "tracks", force: :cascade do |t|
    t.string   "name"
    t.date     "date_finished"
    t.string   "location_finished"
    t.time     "length"
    t.string   "permalink"
    t.boolean  "visible",            default: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.float    "latitude"
    t.float    "longitude"
    t.string   "sound_file_name"
    t.string   "sound_content_type"
    t.integer  "sound_file_size"
    t.datetime "sound_updated_at"
    t.string   "track_version"
    t.integer  "track_number"
    t.float    "pitch"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.float    "average_pitch"
    t.time     "average_length"
    t.integer  "length_sec"
    t.index ["name"], name: "index_tracks_on_name"
    t.index ["permalink"], name: "index_tracks_on_permalink"
  end

  create_table "tracks_stops", force: :cascade do |t|
    t.integer "stop_id"
    t.integer "track_id"
    t.index ["stop_id"], name: "index_tracks_stops_on_stop_id"
    t.index ["track_id"], name: "index_tracks_stops_on_track_id"
  end

end

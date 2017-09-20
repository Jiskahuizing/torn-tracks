class CreateTracks < ActiveRecord::Migration[5.0]

def up
    create_table :tracks do |t|
      t.string  "name"
      t.date    "date_finished"
      t.string  "location_finished"
      t.string  "pitch"
      t.time    "length"
      t.string  "permalink"
      t.boolean "visible", default: false

      t.timestamps
    end
    add_index("tracks", "name")
    add_index("tracks", "permalink")
  end


  def down
    drop_table :tracks
  end

end

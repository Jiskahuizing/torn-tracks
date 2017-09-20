class CreateTagsTracksJoin < ActiveRecord::Migration[5.0]

  def up
    create_table :tags_tracks do |t|
      t.integer "tag_id"
      t.integer "track_id"
    end
    add_index("tags_tracks", ["tag_id", "track_id"])
  end

  def down
    drop_table :tags_tracks
  end

end

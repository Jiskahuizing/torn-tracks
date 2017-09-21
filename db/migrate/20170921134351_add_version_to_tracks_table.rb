class AddVersionToTracksTable < ActiveRecord::Migration[5.0]

  def up
    add_column("tracks", "track_version", :string)
  end

  def down
    remove_column("tracks", "track_version")
  end

end

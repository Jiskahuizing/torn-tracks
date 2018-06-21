class AddCollumnLengthSecToTracks < ActiveRecord::Migration[5.0]

  def up
    add_column("tracks", "length_sec", :integer)
  end

  def down
    remove_column("tracks", "length_sec")
  end

end

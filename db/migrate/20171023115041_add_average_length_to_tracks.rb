class AddAverageLengthToTracks < ActiveRecord::Migration[5.0]

  def up
    add_column("tracks", "average_length", :time)
  end

  def down
    remove_column("tracks", "average_length")
  end

end

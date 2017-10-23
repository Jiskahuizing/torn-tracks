class AddAveragePitchToTracks < ActiveRecord::Migration[5.0]

  def up
    add_column("tracks", "average_pitch", :float)
  end

  def down
    remove_column("tracks", "average_pitch")
  end

end

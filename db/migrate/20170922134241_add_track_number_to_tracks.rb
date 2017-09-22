class AddTrackNumberToTracks < ActiveRecord::Migration[5.0]

    def up
      add_column("tracks", "track_number", :integer)
    end

    def down
      remove_column("tracks", "track_number")
    end

end

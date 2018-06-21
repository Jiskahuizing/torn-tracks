class AddTrackIdToStops < ActiveRecord::Migration[5.0]

  def up
    add_column("stops", "track_id", :integer)
  end

  def down
    remove_column("stops", "track_id")
  end

end

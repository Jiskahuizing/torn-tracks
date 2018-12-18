class DropOldJoinStopsTracksTable < ActiveRecord::Migration[5.0]
  def up
    drop_table :tracks_stops
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

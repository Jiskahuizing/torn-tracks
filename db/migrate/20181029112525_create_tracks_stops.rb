class CreateTracksStops < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks_stops do |t|
      t.references :stop, foreign_key: true
      t.references :track, foreign_key: true
    end
  end
end

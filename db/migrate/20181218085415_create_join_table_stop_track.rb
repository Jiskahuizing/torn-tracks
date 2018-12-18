class CreateJoinTableStopTrack < ActiveRecord::Migration[5.0]
  def change
    create_join_table :stops, :tracks do |t|
      # t.index [:stop_id, :track_id]
      # t.index [:track_id, :stop_id]
    end
  end
end

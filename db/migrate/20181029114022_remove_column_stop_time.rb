class RemoveColumnStopTime < ActiveRecord::Migration[5.0]

  def up
      remove_column :stops, :stop_time
    end

    def down
      add_column :stops, :stop_time, :time
    end
end

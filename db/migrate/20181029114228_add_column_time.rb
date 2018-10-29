class AddColumnTime < ActiveRecord::Migration[5.0]

  def up
      add_column :stops, :stop_time, :integer
    end

    def down
      remove_column :stops, :stop_time
    end
end

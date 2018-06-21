class CreateStops < ActiveRecord::Migration[5.0]
  
  def up
    create_table :stops do |t|
      t.integer "stop_number"
      t.time "stop_time"
    end
  end

  def down
    drop_table :stops do |t|
    end
  end

end

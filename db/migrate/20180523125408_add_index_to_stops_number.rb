class AddIndexToStopsNumber < ActiveRecord::Migration[5.0]

  def up
    add_index("stops", "stop_number")
  end

  def down
    remove_index("stops", "stop_number")
  end
end

class AddLatitudeAndLongitude < ActiveRecord::Migration[5.0]

  def up
    add_column("tracks", "latitude", :float)
    add_column("tracks", "longitude", :float)
  end

  def down
      remove_column("tracks", "longitude")
      remove_column("tracks", "latitude")
  end
end

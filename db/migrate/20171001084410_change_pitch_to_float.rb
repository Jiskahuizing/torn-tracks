class ChangePitchToFloat < ActiveRecord::Migration[5.0]

  def up
    remove_column("tracks", "pitch")
    add_column("tracks", "pitch", :float)
  end

  def down
    remove_column("tracks", "pitch")
    add_column("tracks", "pitch", :string)
  end
end

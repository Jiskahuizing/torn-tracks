class AddColumnStopsTitle < ActiveRecord::Migration[5.0]

  def up
      add_column :stops, :stop_title, :string
    end

    def down
      remove_column :stops, :stop_title
    end
end

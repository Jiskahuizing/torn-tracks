class CreateFinishedDates < ActiveRecord::Migration[5.0]
  def change
    create_table :finished_dates do |t|

      t.timestamps
    end
  end
end

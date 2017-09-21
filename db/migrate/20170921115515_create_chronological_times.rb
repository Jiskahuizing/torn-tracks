class CreateChronologicalTimes < ActiveRecord::Migration[5.0]
  def change
    create_table :chronological_times do |t|

      t.timestamps
    end
  end
end

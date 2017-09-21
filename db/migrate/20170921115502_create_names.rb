class CreateNames < ActiveRecord::Migration[5.0]
  def change
    create_table :names do |t|

      t.timestamps
    end
  end
end

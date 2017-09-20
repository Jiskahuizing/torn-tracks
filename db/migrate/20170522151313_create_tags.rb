class CreateTags < ActiveRecord::Migration[5.0]

  def up
    create_table :tags do |t|
      t.string "name"
      t.string "permalink"
      t.boolean "visible", default: false
      
      t.timestamps
    end
    add_index("tags", "name")
    add_index("tags", "permalink")
  end


  def down
    drop_table :tags
  end

end

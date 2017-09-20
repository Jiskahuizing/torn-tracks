class CreateAdminUsers < ActiveRecord::Migration[5.0]

  def up
    create_table :admin_users do |t|

      t.string "first_name", :limit => 25
      #After having created a table and you want to add a column, you have to use the longer version.
      t.string "last_name", :limit => 50
      t.string "email", :default => '', :null => false
      t.string "username", :limit => 25
      t.string "password_digest"

      t.timestamps
    end
    puts "*** Adding an index ***"
    add_index("admin_users", "username")
  end

  def down
    drop_table :admin_users
  end

end

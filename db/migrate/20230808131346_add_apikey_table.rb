class AddApikeyTable < ActiveRecord::Migration[7.0]

def up
  create_table :keys do |t|
    t.string  "name"
    t.string  "password_digest"
  end
end


def down
  drop_table :keys
end

end
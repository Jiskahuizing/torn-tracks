class Key < ApplicationRecord

  has_secure_password

  scope :sorted, lambda { order("name ASC") }

end
class Track < ApplicationRecord

  has_and_belongs_to_many :tags

  scope :visible, lambda { where(:visible => true) }
  scope :invisible, lambda { where(:visible => false) }
  scope :sorted, lambda { order("name ASC") }

end

class Tag < ApplicationRecord

  has_and_belongs_to_many :tracks

  scope :visible, lambda { where(:visible => true) }
  scope :invisible, lambda { where(:visible => false) }
  scope :sorted, lambda { order("name ASC") }

end

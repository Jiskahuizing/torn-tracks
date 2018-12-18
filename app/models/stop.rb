class Stop < ApplicationRecord

  has_and_belongs_to_many :tracks

  scope :sorted, lambda { order("stop_number ASC") }

end

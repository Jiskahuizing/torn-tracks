class Stop < ApplicationRecord

  belongs_to :track

  scope :sorted, lambda { order("stop_number ASC") }

end

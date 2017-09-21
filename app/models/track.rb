class Track < ApplicationRecord

  has_and_belongs_to_many :tags
  has_attached_file :sound

  scope :visible, lambda { where(:visible => true) }
  scope :invisible, lambda { where(:visible => false) }
  scope :sorted, lambda { order("name ASC") }
  scope :sorted_by_date_finished, lambda { order("date_finished DESC") }
  scope :sorted_by_pitch, lambda { order("pitch ASC") }
  scope :sorted_by_location, lambda { order("location_finished ASC") }


  do_not_validate_attachment_file_type :sound
  #validates_attachment :sound, content_type: { content_type: "audio/mp3", "audio/wav", "audio/mpeg" }

end

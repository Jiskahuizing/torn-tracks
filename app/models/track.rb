class Track < ApplicationRecord

  has_and_belongs_to_many :tags
  has_and_belongs_to_many :stops #må ha denne for ellers leter etter stops_tracks alfabetisk join

  has_attached_file :sound
  has_attached_file :image

  scope :visible, lambda { where(:visible => true) }
  scope :invisible, lambda { where(:visible => false) }
  scope :sorted, lambda { order("name ASC") }
  scope :sorted_by_name, lambda { order("track_number ASC", "track_version ASC") }
  scope :sorted_by_date_finished, lambda { order("date_finished DESC") }
  scope :sorted_by_pitch, lambda { order("pitch ASC") }
  scope :sorted_by_location, lambda { order("location_finished ASC") }
  scope :sorted_by_name_DESC, lambda { order("track_number DESC") }

  do_not_validate_attachment_file_type :sound
  #validates_attachment_content_type :sound, :content_type => ['audio/mp3', "audio/wav", "audio/mpeg", 'application/x-mp3'], :if => :sound?

  do_not_validate_attachment_file_type :image
  #validates_attachment :image, :content_type => [content_type: "gif", "png", "jpg", "jpeg"]

end

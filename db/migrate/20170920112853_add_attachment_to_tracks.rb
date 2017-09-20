class AddAttachmentToTracks < ActiveRecord::Migration[5.0]

  def up
    add_attachment :tracks, :sound
  end

  def down
    remove_attachment :tracks, :sound
  end

end

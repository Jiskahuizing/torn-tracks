class AddImageColumnToTracksTable < ActiveRecord::Migration[5.0]

    def up
      add_attachment :tracks, :image
    end

    def down
      remove_attachment :tracks, :image
    end

end

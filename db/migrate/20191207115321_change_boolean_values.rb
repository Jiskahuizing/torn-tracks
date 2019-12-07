class ChangeBooleanValues < ActiveRecord::Migration[5.2]
  def change
    Track.where("visible = 't'").update_all(visible: 1)
    Track.where("visible = 'f'").update_all(visible: 0)
    Tag.where("visible = 't'").update_all(visible: 1)
    Tag.where("visible = 'f'").update_all(visible: 0)
  end
end

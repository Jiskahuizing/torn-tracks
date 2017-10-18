class NamesController < ApplicationController

  layout 'names'

  def index
    @tracks = Track.sorted_by_name
  end

  def show
    singletrack=Track.find(params[:id])
    @tracks = Track.where("track_number=?", singletrack.track_number)
  end

end

class NamesController < ApplicationController

  layout 'names'

  def index
    @tracks=Array.new
    tracknumbers = Track.select(:track_number).distinct.sorted_by_name
    tracknumbers.each do |tn|
      @tracks.concat Track.where(track_number: tn.track_number).limit(1)
    end
  end

  def show
    singletrack=Track.find(params[:id])
    @tracks = Track.where("track_number=?", singletrack.track_number)
  end
end

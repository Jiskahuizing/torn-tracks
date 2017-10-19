class LocationsController < ApplicationController

  layout 'locations'

  def index
    @tracks = Track.sorted_by_location
    @hash = Gmaps4rails.build_markers(@tracks) do |track, marker|
      marker.lat track.latitude
      marker.lng track.longitude
    end
  end

end

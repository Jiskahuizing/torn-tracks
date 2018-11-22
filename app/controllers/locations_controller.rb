class LocationsController < ApplicationController

  layout 'locations'

  def index
    @tracks = Track.sorted_by_location

    @hash = Gmaps4rails.build_markers(@tracks) do |track, marker|
      marker.lat track.latitude
      marker.lng track.longitude
      marker.infowindow "<input class=\"newsound\" type=\"button\" value=\"play\" data-arglink="+track.sound.to_s+" data-argtitle="+track.track_number.to_s+" />
      Track # "+track.track_number.to_s+"</a>"+ " " + track.track_version + " // " +
      track.location_finished + "<br>"
    end
  end

end

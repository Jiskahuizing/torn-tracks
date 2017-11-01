class LocationsController < ApplicationController

  layout 'locations'

  def index
    @tracks = Track.sorted_by_location

    @hash = Gmaps4rails.build_markers(@tracks) do |track, marker|
      marker.lat track.latitude
      marker.lng track.longitude
      marker.infowindow track.name + track.track_number.to_s + " " + track.track_version + " // " +
      track.location_finished + "<br>" +

      "<td><audio controls controlsList=\"nodownload\" preload=\"none\">
              <source src=" + track.sound.to_s + " type=\"audio/mpeg\">
                Your browser does not support the audio element.
          </audio>
      </td>"

    end
  end

end

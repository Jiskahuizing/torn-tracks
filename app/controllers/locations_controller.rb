class LocationsController < ApplicationController

  layout 'locations'

  def index
    @tracks = Track.sorted_by_location
  end

end

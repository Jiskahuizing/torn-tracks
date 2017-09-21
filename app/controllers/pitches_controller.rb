class PitchesController < ApplicationController

  layout 'public'

  def index
    @tracks = Track.sorted_by_pitch
  end

end

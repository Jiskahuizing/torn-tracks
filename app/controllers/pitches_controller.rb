class PitchesController < ApplicationController

  layout 'pitch'

  def index
    @tracks = Track.sorted_by_pitch
  end

end

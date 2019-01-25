class StopMapsController < ApplicationController

layout 'stopmap'

  def index
    @tracks=Array.new
    @trackall = Track.all
    @trackall.each do |tn|
      if tn.stops.count > 0
        @tracks.concat Track.where(id: tn.id)
      end
    end
  end
end

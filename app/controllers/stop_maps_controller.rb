class StopMapsController < ApplicationController

layout 'stopmap'

  def index
    @tracks=Array.new
    @trackall = Track.all.sorted_by_name_DESC
    @trackall.each do |tn|
      if tn.stops.count > 0
        @tracks.concat Track.where(id: tn.id)
      end
    end


  end
end

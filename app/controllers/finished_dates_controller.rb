class FinishedDatesController < ApplicationController

  layout 'chronology'

  def index
    @tracks = Track.sorted_by_date_finished
  end

  def show

  end

end

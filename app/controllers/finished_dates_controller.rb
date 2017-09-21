class FinishedDatesController < ApplicationController

  layout 'public'

  def index
    @tracks = Track.sorted_by_date_finished
  end

  def show

  end

end

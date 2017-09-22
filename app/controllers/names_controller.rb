class NamesController < ApplicationController

  layout 'public'

  def index
    @tracks = Track.sorted_by_name
  end

  def show

  end

end

class NamesController < ApplicationController

  layout 'public'

  def index
    @tracks = Track.sorted
  end

  def show

  end

end

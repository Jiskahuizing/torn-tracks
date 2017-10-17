class NamesController < ApplicationController

  layout 'names'

  def index
    @tracks = Track.sorted_by_name
  end

  def show

  end

end

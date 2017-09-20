class PublicController < ApplicationController

  layout 'public'

  before_action :setup_navigation

  def index
    # Introduction text
  end

  def show
    @track = Track.visible.where(:permalink => params[:permalink]).first
    if @track.nil?
      redirect_to(root_path)
    else
      #Display the page content usting show.html.erb
    end
  end

  def setup_navigation
  @tracks = Track.visible.sorted
  end

end

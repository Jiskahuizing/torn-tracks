class StaticController < ApplicationController
  @@data = File.read("#{Rails.root}/app/views/static/sketch-map-track-list.json")

  def index
    render :json => @@data
  end
end

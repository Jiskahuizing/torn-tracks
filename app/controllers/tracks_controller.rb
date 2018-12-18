class TracksController < ApplicationController

  before_action :confirm_logged_in

  layout 'admin'

  def index
    @tracks = Track.sorted
  end

  def show
    @track = Track.find(params[:id])
  end

  def new
    @track = Track.new(:name => 'Default')
  end

  def create
    # Instantiate a new object using form parameters
    @track = Track.new(track_params)
    # Regne om fra HH:MM:SS til sekunder
    string_sec=params[:track][:length_sec]
    params[:track][:length_sec]=string_sec.split(':').inject(0){|a,m| a=a * 60 + m.to_i}

    # Save object
    if @track.save
      # If save succeeds: redirect to the index action
      redirect_to(tracks_path)
      flash[:notice] = "Track '#{@track.name}' saved succesfully."
    else
      # If save fails: redisplay the form so user can fix problems
      render('new')
    end
  end

  def edit
    @track = Track.find(params[:id])
  end

  def update
    @track = Track.find(params[:id])
    # Regne om fra HH:MM:SS til sekunder
    string_sec=params[:track][:length_sec]
    params[:track][:length_sec]=string_sec.split(':').inject(0){|a,m| a=a * 60 + m.to_i}

    if @track.update_attributes(track_params)
      redirect_to(track_path(@track))
      flash[:notice] = "Track '#{@track.name}' updated succesfully."
    else
      render('edit')
    end
  end

  def delete
    @track = Track.find(params[:id])
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    redirect_to(tracks_path)
    flash[:notice] = "Track '#{@track.name}' destroyed succesfully."
  end

  def stopdelete
    @track = Track.find(params[:id])
    @stop = @track.stops.find(params[:stop_id])
    @track.stops.delete(@stop)
    redirect_to(track_path(params[:id]))
    flash[:notice] = "Trackstop destroyed succesfully."
  end

  private

  def track_params
    params.require(:track).permit(
      :name, :date_finished, :location_finished, :latitude, :longitude,
      :pitch, :length, :permalink, :visible, :sound, :track_version,
      :track_number, :image, :average_pitch, :average_length, :length_sec)
  end

end

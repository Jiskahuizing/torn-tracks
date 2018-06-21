class StopsController < ApplicationController

  before_action :confirm_logged_in

  layout 'admin'

def index
  @stops = Stop.sorted
end

def show
  @stop = Stop.find(params[:id])
end

def new
  @stop = Stop.new(:stop_number => 'Default')
end

def create
  @stop = Stop.new(stop_params)
  # Save object
  if @stop.save
    redirect_to(stops_path)
  else
    render('new')
  end
end

def edit
  @stop = Stop.find(params[:id])
end

def update
  @stop = Stop.find(params[:id])
  # Regne om fra HH:MM:SS til sekunder
  string_sec=params[:stop][:stop_time]
  params[:stop][:stop_time]=string_sec.split(':').inject(0){|a,m| a=a * 60 + m.to_i}

  if @stop.update_attributes(stop_params)
    redirect_to(stop_path(@stop))
    flash[:notice] = "Stop '#{@stop.stop_number}' updated succesfully."
  else
    render('edit')
  end
end

def delete
  @stop = Stop.find(params[:id])
end

def destroy
  @stop = Stop.find(params[:id])
  @stop.destroy
  redirect_to(stops_path)
  flash[:notice] = "Stop '#{@stop.stop_number}' destroyed succesfully."
end

private
def stop_params
  params.require(:stop).permit(:stop_number, :stop_time, :track_id)
end

end

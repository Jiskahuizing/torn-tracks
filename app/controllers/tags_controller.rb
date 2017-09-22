class TagsController < ApplicationController

  before_action :confirm_logged_in

  layout 'admin'

  def index
    @tags = Tag.sorted
  end

  def show
    @tag = Tag.find(params[:id])
  end

  def new
    @tag = Tag.new(:name => 'Default')
  end

  def create
    # Instantiate a new object using form parameters
    @tag = Tag.new(tag_params)
    # Save object
    if @tag.save
      # If save succeeds: redirect to the index action
      redirect_to(tags_path)
    else
      # If save fails: redisplay the form so user can fix problems
      render('new')
    end
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update_attributes(tag_params)
      redirect_to(tag_path(@tag))
      flash[:notice] = "Tage '#{@tag.name}' updated succesfully."
    else
      render('edit')
    end
  end

  def delete
    @tag = Tag.find(params[:id])
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    redirect_to(tags_path)
    flash[:notice] = "Tag '#{@tag.name}' destroyed succesfully."
  end

  private
  def tag_params
    params.require(:tag).permit(:name, :visible, :permalink)
  end

end

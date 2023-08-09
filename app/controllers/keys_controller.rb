class KeysController < ApplicationController

  layout 'admin'

    before_action :confirm_logged_in

    def index
      @key = Key.sorted
    end

    def new
      @key = Key.new
    end

    def create
      @key = Key.new(key_params)
      if @key.save
        flash[:notice] = "API key '#{@key.name}' created succesfully."
        redirect_to(keys_path)
      else
        render('new')
      end
    end

    def edit
      @key = Key.find(params[:id])
    end

    def update
      @key = Key.find(params[:id])
      if @key.update_attributes(key_params)
        flash[:notice] = "API key '#{@key.name}' updated succesfully."
        redirect_to(key_path)
      else
        render('edit')
      end
    end

    def delete
      @key = Key.find(params[:id])
    end

    def destroy
      @key = Key.find(params[:id])
      @key.destroy
      flash[:notice] = "API key '#{@key.name}' destroyed succesfully."
      redirect_to(keys_path)
    end

    private

    def key_params
      params.require(:key).permit(:key_name, :key_password)
      # Permit :password, but NOT :password_digest !!
    end

  end

Rails.application.routes.draw do


  #Root route:
  root :to => 'frontpage#index'

  get 'show/:permalink', :to => 'public#show', :as => 'public_show'

  get 'admin', :to => 'access#menu'
  get 'access/menu'
  get 'access/login'
  post 'access/attempt_login'
  get 'access/logout'

  get 'public/index'
  get 'about/index'
  get 'contact/index'
  get 'frontpage/index'

  get 'track/:id/:stop_id', :to => 'tracks#stopdelete', :as => 'delete_stop_in_track'
  get 'sketch-map-track-list.json' => 'static#sketch-map-track-list', :defaults => { :format => 'json' }

  resources :admin_users, :except => [:show] do
    member do
      get :delete
    end
  end

  resources :tags do
    member do
      get :delete
    end
  end

  resources :stops do
    member do
      get :delete
    end
  end

  resources :tracks do
    member do
      get :delete
    end
  end

  resources :locations do
    member do
      get :delete
    end
  end

  resources :names do
    member do
      get :delete
    end
  end

  resources :finished_dates do
    member do
      get :delete
    end
  end

  resources :pitches do
    member do
      get :delete
    end
  end

  resources :stop_maps do
    member do
      get :delete
    end
  end

  resources :keys do
    member do
      get :delete
    end
  end

end

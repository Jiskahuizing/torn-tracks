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

  resources :stop_map do
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

end

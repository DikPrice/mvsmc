Rails.application.routes.draw do
  root 'homes#index'

  get '/submissions', to: 'homes#index'
  get '/submissions/new', to: 'homes#index'
  get '/submissions/:id', to: 'homes#index'
  get '/submissions/:id/update', to: 'homes#index'

  get '/events', to: 'homes#index'
  get '/events/new', to: 'homes#index'
  get '/events/:id', to: 'homes#index'
  get '/events/:id/update', to: 'homes#index'

  get '/models', to: 'homes#index'
  get '/models/print/:id', to: 'homes#index'
  get '/models/:id', to: 'homes#index'
  get '/models/:id/update', to: 'homes#index'

  devise_for :users
  resources :users, only: [ :index, :show, :create ]

  resources :imports, only: [ :index, :create ]
  namespace :api do
    namespace :v1 do
      resources :models, only: [ :index, :show, :create, :update, :destroy ]
      resources :modelers, only: [ :show, :create, :update ] do
        resources :models, only: :index
      end
      resources :submissions, only: [ :index, :show, :create, :update, :destroy ]
      resources :events, only: [ :index, :show, :create, :update ] do
        resources :models, only: [ :index ]
      end
      resources :event_registrations, only: [ :create, :destroy ]
    end
  end
end

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
  get '/models/:id', to: 'homes#index'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :imports, only: [ :index, :create ]
  namespace :api do
    namespace :v1 do
      resources :models, only: [ :index, :show, :create, :update ]
      resources :modelers, only: [ :show, :create, :update ]
      resources :submissions, only: [ :index, :show, :create, :update ]
      resources :events, only: [ :index, :show, :create, :update ] do
        resources :models, only: [ :index ]
      end
    end
  end
end

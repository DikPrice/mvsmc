Rails.application.routes.draw do
  root 'homes#index'
  get '/submissions', to: 'homes#index'
  get '/submissions/:id', to: 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :imports, only: [ :index, :create ]
  namespace :api do
    namespace :v1 do
      resources :submissions, only: [ :index, :show ]
    end
  end
end

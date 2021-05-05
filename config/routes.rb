Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get "jokes/:id", to: 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :jokes, only: [ :index, :create, :show ] do
        resources :translations, only: [ :create ]
        resources :liked_jokes, only: [ :create ]
        resources :saved_jokes, only: [ :create ]
      end
      resources :liked_jokes, only: [ :destroy ]
      resources :saved_jokes, only: [ :index, :destroy ]
      get :logged_in, to: "users#logged_in"
    end
  end

end

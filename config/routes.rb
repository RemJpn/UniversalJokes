Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get "saved", to: 'pages#home'
  get "profile", to: 'pages#home'
  get "jokes/:id", to: 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get "jokes/search/:query", to: "jokes#search"
      resources :jokes, only: [ :index, :create, :show, :destroy ] do
        resources :translations, only: [ :create ]
        resources :liked_jokes, only: [ :create ]
        resources :saved_jokes, only: [ :create ]
      end
      resources :liked_jokes, only: [ :destroy ]
      resources :saved_jokes, only: [ :index, :destroy ]
      get :logged_in, to: "users#logged_in"
      patch :avatar, to: "users#update_avatar"
      resources :users, only: [:index, :update]

    end
  end

end

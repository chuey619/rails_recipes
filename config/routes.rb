Rails.application.routes.draw do

      get 'recipes/index'
      post 'recipes', to: 'recipes#create'
      get 'recipes/show/:id', to: 'recipes#show'
      delete 'recipes/destroy/:id', to:'recipes#destroy' 
      put 'recipes/:id', to: 'recipes#update'
      post '/auth/login', to: 'sessions#create'
      delete '/auth/logout', to: 'sessions#destroy'
      resources :users

  
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

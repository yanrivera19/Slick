Rails.application.routes.draw do
  # namespace :api do
  #   get 'workspaces/create'
  # end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
	post 'api/test', to: 'application#test'

	mount ActionCable.server => "/cable"

	#NESTED ROUTES FOR MESSAGES AND OTHER THINGS????

	namespace :api, defaults: { format: :json } do
		resources :users, only: [:index, :create, :show]
		resource :session, only: [:show, :create, :destroy]
		resources :workspaces, only: [:show, :create, :destroy, :update]
		resources :channels, only: [:show, :create, :destroy, :update]
		resources :direct_messages, only: [:show, :create, :destroy, :update]
		resources :messages, only: [:show, :create, :destroy, :update]
		
	end

	get '*path', to: "static_pages#frontend_index"
end

# require "byebug"

class Api::UsersController < ApplicationController
  wrap_parameters :user, include: User.attribute_names + ["password"]

  before_action :require_logged_out, only: [:create]

	def index
		debugger
		@users = User.all 
		debugger
		render :index
	end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
			#should render welcome page
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

	def show
		@user = User.find_by_id(params[:id])
		
		render :show
	end

	# def update 
	# 	@user = User.find_by_id(params[:id]) 

	# 	if current_user.id == @user.id
	# 		if @user.update(user_params)
	# 			#should redirect to workspace page
	# 			redirect_to user_url(current_user.id)
	# 		else
	# 			render json: {errors: @user.errors.full_messages}, status: 422
	# 			#users should be able to update their username on their show page
	# 			render :edit
	# 		end
	# 	else 
	# 		render json: {errors: @user.errors.full_messages}, status: 422
	# 		render :edit
	# 	end
	# end 

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end

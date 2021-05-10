class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:logged_in]

  def logged_in
    render json: user_signed_in? ? render_jsonapi_user : { authenticated: false }
  end

  def update
    current_user.update(user_params)
    render json: render_jsonapi_user
  end

  private

  def render_jsonapi_user
    {
      authenticated: true,
      id: current_user.id,
      nickname: current_user.nickname,
      email: current_user.email,
      nb_liked: current_user.liked_jokes.size
    }
  end

  def user_params
    params.require(:user).permit(:nickname)
  end
end

class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:logged_in]

  def logged_in
    render json: user_signed_in? ? render_jsonapi_user : {}
  end

  private

  def render_jsonapi_user
    {
      id: current_user.id,
      email: current_user.email,
      nb_liked: current_user.liked_jokes.size
    }
  end
end

class Api::V1::LikedJokesController < ApplicationController

  def create
    joke = Joke.find(params[:joke_id])
    LikedJoke.create(
      joke: joke,
      user: current_user
    )
    render json: prepare_api_v1_joke(joke)
  end

  def destroy
    like = LikedJoke.find(params[:id])
    joke = like.joke
    like.destroy

    render json: prepare_api_v1_joke(joke)
  end

  private

  def liked_joke_params
    params.require(:joke).permit(:id)
  end
end

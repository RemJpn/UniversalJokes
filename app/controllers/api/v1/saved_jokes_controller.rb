class Api::V1::SavedJokesController < ApplicationController
  def index
    saved_jokes = current_user.saved_jokes.sort_by {|saved_joke| saved_joke.created_at }.reverse
    api_jokes = saved_jokes.map { |saved_joke| prepare_api_v1_joke(saved_joke.joke) }
    render json: api_jokes
  end

  def create
    joke = Joke.find(params[:joke_id])
    SavedJoke.create(
      joke: joke,
      user: current_user
    )

    render json: prepare_api_v1_joke(joke)
  end

  def destroy
    like = SavedJoke.find(params[:id])
    joke = like.joke
    like.destroy

    render json: prepare_api_v1_joke(joke)
  end

  private

  def liked_joke_params
    params.require(:joke).permit(:id)
  end
end

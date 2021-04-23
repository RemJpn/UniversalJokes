class Api::V1::SavedJokesController < ApplicationController
  def create
    joke = Joke.find(params[:joke_id])
    SavedJoke.create(
      joke: joke,
      user: current_user
    )

    render json: prepare_for_api(joke)
  end

  def destroy
    like = SavedJoke.find(params[:id])
    joke = like.joke
    like.destroy

    render json: prepare_for_api(joke)
  end

  private

  def liked_joke_params
    params.require(:joke).permit(:id)
  end

  def prepare_for_api(joke)
    {
      id: joke.id,
      author: joke.user.email,
      language: joke.language.name,
      category: joke.category.name,
      content: joke.content,
      likes: joke.liked_jokes.count,
      liked_id: current_user&.liked_jokes&.find { |like| like.joke == joke }&.id,
      saved_id: current_user&.saved_jokes&.find { |saved| saved.joke == joke }&.id,
      created_at: joke.created_at
    }
  end
end

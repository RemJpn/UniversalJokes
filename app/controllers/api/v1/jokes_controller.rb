class Api::V1::JokesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    jokes = Joke.all
    api_jokes = jokes.map { |joke| prepare_for_api(joke) }
    render json: api_jokes
  end

  private

  def prepare_for_api(joke)
    {
      id: joke.id,
      author: joke.user.email,
      language: joke.language.name,
      category: joke.category.name,
      content: joke.content,
      likes: joke.liked_jokes.count,
      created_at: joke.created_at
    }
  end
end

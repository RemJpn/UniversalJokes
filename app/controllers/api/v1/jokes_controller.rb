class Api::V1::JokesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    jokes = Joke.all
    api_jokes = jokes.map { |joke| prepare_for_api(joke) }
    render json: api_jokes
  end

  def create
    new_joke = Joke.new(message_params)
    new_joke.user = current_user
    # Default language and category for now
    new_joke.language = Language.where(name: 'Français').first
    new_joke.category = Category.where(name: 'Courte').first
    if new_joke.save!
      render json: prepare_for_api(new_joke)
    end
  end

  private

  def message_params
    params.require(:joke).permit(:content)
  end

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

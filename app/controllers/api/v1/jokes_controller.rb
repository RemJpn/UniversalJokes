# $LOAD_PATH << '.'
# require 'prepare_for_api'

class Api::V1::JokesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    jokes = Joke.all.sort_by(&:created_at).reverse
    api_jokes = jokes.map { |joke| prepare_api_v1_joke(joke) } # defined in concerns/response.rb
    render json: api_jokes
  end

  def show
    joke = Joke.find(params[:id])
    render json: prepare_api_v1_joke(joke)
  end

  def create
    new_joke = Joke.new(
      content: new_joke_params[:content],
      language: Language.find_by(name: new_joke_params[:language])
    )
    new_joke.user = current_user
    # Default language and category for now
    # new_joke.language = Language.where(name: 'fr').first
    new_joke.category = Category.where(name: 'Courte').first
    if new_joke.save!
      render json: prepare_api_v1_joke(new_joke)
    end
  end

  private

  def new_joke_params
    params.require(:joke).permit(:content, :language)
  end
end

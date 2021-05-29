# $LOAD_PATH << '.'
# require 'prepare_for_api'

class Api::V1::JokesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    jokes = Joke.all.sort_by(&:created_at).reverse
    api_jokes = jokes.map { |joke| prepare_api_v1_joke(joke) } # defined in concerns/response.rb
    render json: api_jokes
  end

  def search
    if params[:query].blank?
      redirect_to api_v1_jokes_path and return
    end

    selected_jokes = Joke.search_by_author_and_content(params['query'])
                         .sort_by(&:created_at)
                         .reverse
    api_jokes = selected_jokes.map { |joke| prepare_api_v1_joke(joke) } # defined in concerns/response.rb
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

  def destroy
    joke = Joke.find(params[:id])
    joke.translations.destroy_all
    joke.liked_jokes.destroy_all
    joke.saved_jokes.destroy_all
    joke.destroy

    render json: { deleted_joke_id: params[:id] }
  end

  private

  def new_joke_params
    params.require(:joke).permit(:content, :language)
  end
end

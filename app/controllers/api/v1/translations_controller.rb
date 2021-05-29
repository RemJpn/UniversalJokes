class Api::V1::TranslationsController < ApplicationController

  def create
    joke = Joke.find(params[:joke_id])
    translation = Translation.new(
      content: translation_params[:content],
      language: Language.find_by(name: translation_params[:language])
    )
    translation.joke = joke
    translation.user = current_user
    translation.save
    render json: prepare_api_v1_joke(joke)
  end

  def destroy
    translation = Translation.find(params[:id])
    joke = translation.joke
    translation.destroy
    render json: prepare_api_v1_joke(joke)
  end

  private

  def translation_params
    params.require(:translation).permit(:content, :language)
  end
end

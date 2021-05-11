module Response
  def prepare_api_v1_joke(joke)
    {
      id: joke.id,
      author: joke.user.nickname || 'Anonymous',
      avatar: user_avatar(joke.user),
      language: joke.language.name,
      category: joke.category.name,
      content: joke.content,
      likes: joke.liked_jokes.count,
      liked_id: current_user&.liked_jokes&.find { |like| like.joke == joke }&.id,
      saved_id: current_user&.saved_jokes&.find { |saved| saved.joke == joke }&.id,
      created_at: joke.created_at,
      translations: joke.translations.map { |translation| prepare_api_v1_translation(translation) }
    }
  end

  def prepare_api_v1_translation(translation)
    {
      id: translation.id,
      author: translation.user.nickname || 'Anonymous',
      language: translation.language.name,
      content: translation.content,
      created_at: translation.created_at,
      joke_id: translation.joke.id
    }
  end

  def user_avatar(user)
    if user.avatar.attached?
      view_context.cl_image_path(user.avatar.key)
    else
      view_context.image_path("avatar.png")
    end
  end
end

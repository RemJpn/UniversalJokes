
puts "Start"
puts "Clean DB"
LikedJoke.destroy_all
Joke.destroy_all
Category.destroy_all
Language.destroy_all
User.destroy_all

#----------------------------------------------------
puts "Seeding users..."
user1 = User.create!(
  email: "user1@test.com",
  password: "123456",
  )

user2 = User.create!(
  email: "user2@test.com",
  password: "123456",
  )

user3 = User.create!(
  email: "user3@test.com",
  password: "123456"
  )

#----------------------------------------------------
puts "Seeding languages..."

language1 = Language.create!(name: 'Français')
language2 = Language.create!(name: 'English')
language3 = Language.create!(name: 'Español')
language4 = Language.create!(name: '日本語')


#----------------------------------------------------
puts "Seeding categories..."

category1 = Category.create!(name: 'Courte')
category2 = Category.create!(name: 'Nulle')
category3 = Category.create!(name: 'Absurde')



#----------------------------------------------------
puts "Seeding Jokes..."

joke1 = Joke.create!(
  content: "C’est un pain au chocolat qui rencontre un croissant et qui lui dit :

– Eh, pourquoi t’es en forme de lune toi ?

– Oh, j’t’en pose des questions, moi ? Est-ce que j’te demande pourquoi t’as une merde au cul ?",
  user: user1,
  language: language1,
  category: category1
)

joke2 = Joke.create!(
  content: "Une femme discute avec une amie :

– « J’ai un mari en or. »

L’autre lui répond :

« Moi, le mien, il est en taule. »",
  user: user1,
  language: language1,
  category: category1
)

joke3 = Joke.create!(
  content: "I ate a clock yesterday, it was very time-consuming.",
  user: user2,
  language: language2,
  category: category1
)


#----------------------------------------------------
puts "Seeding Liked Jokes..."

likedjoke1 = LikedJoke.create!(
  joke: joke1,
  user: user3
  )



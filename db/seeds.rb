
puts "Start"
puts "Clean DB"
LikedJoke.destroy_all
SavedJoke.destroy_all
Translation.destroy_all
Joke.destroy_all
Category.destroy_all
Language.destroy_all
User.destroy_all

#----------------------------------------------------
puts "Seeding users..."
user1 = User.create!(
  email: "user1@test.com",
  password: "123456",
  nickname: "Michel"
  )
user1.avatar.attach(io: File.open('app/assets/images/yoda.png'), filename: 'yoda.png', content_type: 'image/png')


user2 = User.create!(
  email: "user2@test.com",
  password: "123456",
  nickname: "Yoda"
  )

user3 = User.create!(
  email: "user3@test.com",
  password: "123456",
  nickname: "Brian"
  )

#----------------------------------------------------
puts "Seeding languages..."

language1 = Language.create!(name: 'fr')
language2 = Language.create!(name: 'en')
language3 = Language.create!(name: 'es')
language4 = Language.create!(name: 'ja')


#----------------------------------------------------
puts "Seeding categories..."

category1 = Category.create!(name: 'Courte')
category2 = Category.create!(name: 'Nulle')
category3 = Category.create!(name: 'Absurde')



#----------------------------------------------------
puts "Seeding Jokes..."

joke1 = Joke.create!(
  content: "Que dit une banane malade à ses camarades qui ont aussi chopé le virus ?
– On va tous mûrir !",
  user: user1,
  language: language1,
  category: category1
)
Translation.create!(
  content: "What does a sick raisin say to its friends that also caught the virus ?
  - We're all gonna dry!",
  user: user2,
  language: language2,
  joke: joke1
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
Translation.create!(
  content: "J'ai mangé une horloge hier, ca m'a bouffé la journée",
  user: user1,
  language: language1,
  joke: joke3
)

joke4 = Joke.create!(
  content: "Une femme observe son mari en train de planter un clou. Quelques minutes après, elle lui dit :
– Tu me fais penser à la foudre.
– Parce que je suis rapide hein ?
– Non, parce que tu ne frappes jamais au même endroit !",
  user: user3,
  language: language1,
  category: category1
)
Translation.create!(
  content: "A woman observes her husband hitting a nail. Some moments later, she tells him :
– You remind me of lightning.
– Cause I'm fast, right ?
– No, because you never strike the same place twice !",
  user: user2,
  language: language2,
  joke: joke4
)


joke5 = Joke.create!(
  content: "Un homme se rend chez le garagiste et lui demande :
– Pouvez-vous réparer ma roue ?
– Bien sûr, mais comment avez-vous fait pour la crever ?
– J’ai roulé sur une bouteille.
– Vous ne l’aviez pas vue ??
– Non, le mec l’avait dans la poche.",
  user: user3,
  language: language1,
  category: category1
)
Translation.create!(
  content: "A man goes to the garage ans asks the mechanics :
– Can you repare my tyre ?
– Of course, but how did it get punctured ?
– I drove on a glass bottle.
– You didn't see it ??
– No, it was in the guy's pocket.",
  user: user2,
  language: language2,
  joke: joke5
)
Translation.create!(
  content: "男が整備士のところに行き、彼に尋ねます：
-ホイールを直してもらえますか？
-もちろんですが、どうやって彼女を殺したのですか？
-私はボトルを転がしました。
-彼女に会いませんでしたか？
-いいえ、男はポケットに入れていました。",
  user: user3,
  language: language4,
  joke: joke5
)

joke6 = Joke.create!(
  content: "Deux potes discutent :
– Quand j’étais jeune, je détestais aller aux mariages parce les vieux me mettaient une tape dans le dos en me disant « C’est toi le prochain ! »
– Ils ont arrêté ?
– Oui, quand j’ai commencé à leur faire la même chose pour les enterrements.",
  user: user3,
  language: language1,
  category: category1
)

joke7 = Joke.create!(
  content: "Deux vaches discutent :
– Je sais pas pourquoi mais je me sens mal aujourd’hui.
L’autre lui répond :
– J’ai un conseil, arrête l’herbe.",
  user: user3,
  language: language1,
  category: category1
)


joke8 = Joke.create!(
  content: "Un caneton marche au bord d’un étang.
Il voit une affiche où il est inscrit : « Baignade interdite. »
Pourtant, il plonge. Pourquoi ?
Réponse : t’as déjà vu un caneton qui sait lire ?",
  user: user3,
  language: language1,
  category: category1
)

joke9 = Joke.create!(
  content: "Qu’est-ce qui a deux bosses et qui vit au Pôle nord ?
Réponse : un chameau qui s’est perdu.",
  user: user3,
  language: language1,
  category: category1
)
joke10 = Joke.create!(
  content: "Le jour de Noël, la tante de Toto lui dit :
– Tu n’es pas trop triste que je parte demain ?
– Si, un peu, j’aurais préféré que tu partes aujourd’hui.",
  user: user3,
  language: language1,
  category: category1
)

joke11 = Joke.create!(
  content: "Le soir de Noël, deux saucisses se retrouvent dans une casserole.
L’une dit alors :
– Il fait chaud non ?
L’autre se met à crier :
– Oh mon dieu, au secours ! Une saucisse qui parle !",
  user: user3,
  language: language1,
  category: category1
)

joke12 = Joke.create!(
  content: 'A man stands in front of a food truck and reads the menu
  "Cheeseburgers: $5
  Fries: $3
  Handjobs: $10."
  He walks up to the window and asks the beautiful woman working behind the counter, "Are you the one that gives the handjobs?"
  "Yes, I am," she replies seductively.
  "Well, wash your hands, I want a cheeseburger."',
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



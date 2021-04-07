class Joke < ApplicationRecord
  belongs_to :user
  belongs_to :language
  belongs_to :category

  has_many :liked_jokes
end

class Joke < ApplicationRecord
  belongs_to :user
  belongs_to :language
  belongs_to :category

  has_many :liked_jokes
  has_many :saved_jokes
  has_many :translations

  validates :content, presence: true
end

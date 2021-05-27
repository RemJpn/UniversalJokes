class Joke < ApplicationRecord
  belongs_to :user
  belongs_to :language
  belongs_to :category

  has_many :liked_jokes
  has_many :saved_jokes
  has_many :translations

  validates :content, presence: true

  include PgSearch::Model
  pg_search_scope :search_by_author_and_content,
                  against: [:content],
                  associated_against: {
                    user: [:nickname]
                  },
                  using: {
                    tsearch: { prefix: true }
                  }
end

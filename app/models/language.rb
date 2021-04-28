class Language < ApplicationRecord
  has_many :jokes
  has_many :translations
end

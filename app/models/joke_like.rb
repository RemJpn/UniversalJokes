class JokeLike < ApplicationRecord
  belongs_to :joke
  belongs_to :user
end

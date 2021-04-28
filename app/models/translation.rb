class Translation < ApplicationRecord
  belongs_to :joke
  belongs_to :language
  belongs_to :user
end

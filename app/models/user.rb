class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :jokes
  has_many :liked_jokes
  has_many :saved_jokes
  has_many :translations

  has_one_attached :avatar
end

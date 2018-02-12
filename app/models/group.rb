class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members

  validates :name, uniqueness: true, presence: true
  validates :user_ids, presence: true
end

class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages

  validates :name, uniqueness: true, presence: true
  validates :user_ids, presence: true

  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています。'
    else
      'まだメッセージはありません。'
    end
  end
end

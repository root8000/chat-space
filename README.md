Structure of DataBase

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|---------|
|image|string|------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

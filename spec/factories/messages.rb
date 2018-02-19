FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/l_e_others_500.jpg")
    user
    group
  end
end

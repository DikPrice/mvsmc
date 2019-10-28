require 'factory_bot'

FactoryBot.define do
  factory :submission do
    name { "HMS Pinafore" }
    scale { "1:700" }
    source { "Kit" }
    description { "We sail the ocean blue, And our saucy ship's a beauty; We're sober men and true, And attentive to our duty." }
    length { 12 }
    width { 8 }
    height { 20 }
    first_name { "Gilbert" }
    last_name { "Sullivan"}
    phone { "123 456 7890" }
    email{ "hellosailor@saucy.com" }
  end
end

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

end

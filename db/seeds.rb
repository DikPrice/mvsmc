User.create(
  email: "Admin@admin.com",
  username: "admin",
  first_name: "adder",
  last_name: "min",
  password: "password",
  password_confirmation: "password",
  role: 3
)
User.create(
  email: "organiser@organiser.com",
  username: "organiser",
  first_name: "organ",
  last_name: "iser",
  password: "password",
  password_confirmation: "password",
  role: 2
)
Event.create(
  name: "Yankee Homecoming",
  venue: "The First Religious Society Church",
  description: "For the 5th year running the Merrimac Valley Ship Modellers Club is proud to stage a display of members models as part of the Yankee Homecomeng Festival. Doors open 8am to 5pm.",
  address: "26 Pleasant St.",
  city: "Newburyport",
  state: "MA",
  zip: "01950",
  start_date: '20/09/2018',
  end_date: '28/09/2018'
)

require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    description: "Hello, I like plants and I would like to exchange them...",
    email: "john@gmail.com",
    password: "12344",
    city: "Paris",
  },
];

(async () => {
  try {
    const self = await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.create(users);
    console.log(`Created user ${user.firstName}`);
    console.log(`Connection to ${self.connection.name} succesful.`);
  } catch (error) {
    console.log(`An error has occured while seeding... ${error}`);
  }
})();

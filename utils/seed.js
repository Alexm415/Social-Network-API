const connection = require("../config/connection");
const { User, Thought } = require("../models");
const users = [
  {
    username: "Aaryan",
    email: "aaryan@gmail.com",
    thought: "510",
  },
  {
    username: "Smith",
    email: "smith@gmail.com",
    thought: "Ms smith here i come",
  },
  {
    username: "Jones",
    email: "jones@gmail.com",
    thought: "650",
  },
  { username: "Alex", email: "alex@gmail.com", thought: "415" },
  { username: "Mark", email: "mark@gmail.com" },
  {
    username: "Sarah",
    email: "sarah@gmail.com",
  },
  {
    username: "Parker",
    email: "parker@gmail.com",
  },
];

connection.once("open", async () => {
  console.log("connected");
  await User.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});

const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Todo collection and inserts the todos below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/todolist"
);

const todoSeed = [
  { id: 1, done: false, description: 'Pick up eggs' },
  { id: 2, done: false, description: 'Pay electric bill' },
  { id: 3, done: true, description: 'Create todo API' }
];

db.Todo
  .remove({})
  .then(() => db.Todo.collection.insertMany(todoSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

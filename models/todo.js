const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: Number,
  done: Number,
  description: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

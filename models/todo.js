const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: Number,
  done: Boolean,
  description: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

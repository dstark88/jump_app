import axios from "axios";

export default {
  // Gets all todos
  getTodos: function() {
    return axios.get("/api/todos");
  },
  // Gets the todo with the given id
  getTodo: function(id) {
    return axios.get("/api/todos/" + id);
  },
  // Deletes the todo with the given id
  deleteTodo: function(id) {
    return axios.delete("/api/todos/" + id);
  },
  // Saves a todo to the database
  saveTodo: function(todoData) {
    return axios.post("/api/todos", todoData);
  }
};

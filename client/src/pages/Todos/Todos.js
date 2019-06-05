import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import CheckedBtn from "../../components/CheckedBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Todos extends Component {
  // Setting our component's initial state
  state = {
    todos: [],
    id: "",
    done: 0,
    description: String
  };

  // When the component mounts, load all todos and save them to this.state.todos
  componentDidMount() {
    this.loadTodos();
  }

  // Loads all todos  and sets them to this.state.todos
  loadTodos = () => {
    API.getTodos()
      .then(res =>
        this.setState({ todos: res.data, id: "", done: 0, description: "" })
      )
      .catch(err => console.log(err));
  };

  // Marks as checked 
  handleClickTodo = (todo) => {
    var todoList = this.state.todos
    console.log("id:", todo);
      console.log(todoList, "todoList");
      for (var i = 0; i < todoList.length; i++) {
        console.log("todoList[i].done:", todoList[i].done);
        if (todoList[i].done === 0) {
          console.log(todoList[i].done, "Done");
            todoList[i].done = 1;
          } else {
            todoList[i].done = 0;
          }
      }

      this.setState({
        todos: todoList,
      });
      // this.updateTodo();
  };

  updateTodo = id => {
    API.updateTodo(id)
      .then(res => 
        this.handleClickTodo(),
        // this.setState({ done: res.data })
        this.loadTodos()
      )
      .catch(err => console.log(err));

  };
  // Deletes a todo from the database with a given id, then reloads todos from the db
  deleteTodo = id => {
    API.deleteTodo(id)
      .then(res => this.loadTodos())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // When the form is submitted, use the API.saveTodo method to save the todo data
  // Then reload todos from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.description) {
      API.saveTodo({
        id: this.state.id,
        done: 0,
        description: this.state.description
      })
        .then(res => this.loadTodos())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add to your To Do List?</h1>
            </Jumbotron>
            <form>
              Enter Description 
              <Input
                value={this.state.description || ""}
                onChange={this.handleInputChange}
                name="description"
                placeholder="To Do Item (Required)"
              />
              <FormBtn
                disabled={!(this.state.description)}
                onClick={this.handleFormSubmit}
              >
                Submit To Do
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My To Do List</h1>
            </Jumbotron>
            {this.state.todos.length ? (
              <List>
                {this.state.todos.map(todo => {
                  return (
                    <ListItem key={todo._id}>
                      <CheckedBtn className="checked-btn" type="button" onClick={() => this.handleClickTodo(todo._id)} />
                      <a href={"/todos/" + todo._id}>
                        <strong>
                        , {todo.done}, {todo.description}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteTodo(todo._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Todos;

import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";


class Todos extends Component {
  // Setting our component's initial state
  state = {
    todos: [],
    id: "",
    done: "",
    ddescription: ""
  };

  // When the component mounts, load all todos and save them to this.state.todos
  componentDidMount() {
    this.loadTodos();
  }

  // Loads all todos  and sets them to this.state.todos
  loadTodos = () => {
    API.getTodos()
      .then(res =>
        this.setState({ todos: res.data, id: "", done: "", description: "" })
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
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveTodo method to save the todo data
  // Then reload todos from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.id && this.state.done) {
      API.saveTodo({
        id: this.state.id,
        done: this.state.done,
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
            <Jumbotron backgroundImage="./todo.jpg">
              <h1>Add to your todo list?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.id}
                onChange={this.handleInputChange}
                name="id"
                placeholder="id (required)"
              />
              <Input
                value={this.state.done}
                onChange={this.handleInputChange}
                name="done"
                placeholder="done (required)"
              />
              <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.done && this.state.id)}
                onClick={this.handleFormSubmit}
              >
                Submit Todo
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Todos On My List</h1>
            </Jumbotron>
            {this.state.todos.length ? (
              <List>
                {this.state.todos.map(todo => {
                  return (
                    <ListItem key={todo._id}>
                      <a href={"/todos/" + todo._id}>
                        <strong>
                          #{todo.id}. {todo.description}
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

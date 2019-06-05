import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import CheckedBtn from "../../components/CheckedBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
// import { clone } from "@babel/types";
// const { Checkbox, Button } = ReactBootstrap;

class Todos extends Component {
  // Setting our component's initial state
  state = {
    todos: [],
    id: "",
    done: 0,
    description: String
  };

  // constructor() {
  //   super();
  //   this.state = { checkboxChecked: false };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleIsItChecked = this.handleIsItChecked.bind(this);
  //   this.handleToggle = this.handleToggle.bind(this);
  // }
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
  handleClickTodo = id => {
    var todoList = this.state.todos
    // for (let i = 0; i < todos.length; i++) {
      console.log(this.state.todos._id, "state");
        if (todoList[0].done === 0) {
          console.log(todoList[0].done, "Done");
          console.log("id:", todoList[0]._id);
            todoList[0].done = 1;
          } else {
            todoList[0].done = 0;
          }
          this.setState({
            todos: todoList,
          });
  };

  updateTodo = id => {
    this.handleClickTodo();
    API.updateTodo(id)
      .then(res => this.loadTodos())
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
              {/* <Input
                value={this.state.id || ""}
                onChange={this.handleInputChange}
                name="id"
                placeholder="id"
              /> */}
              Enter Description 
              <Input
                value={this.state.description || ""}
                onChange={this.handleInputChange}
                name="description"
                placeholder="To Do Item (Required)"
              />
              {/* Done
              <Input
                type="text"
                value={this.state.done || ""}
                onChange={this.handleInputChange}
                name="done"
                placeholder="Enter true or false?"
              /> */}
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
                    {this.state.todos.map(todo => (
                      
                      <CheckedBtn onClick={() => this.updateTodo(todo._id)} 
                        // handleClickTodo={this.handleClickTodo}
                      />

                      // <CheckedBtn
                      //   key={todo._id}
                      //   id={todo._id}
                      //   name={todo.done}
                      //   className="checked-btn"
                      //   handleClickTodo={this.handleClickTodo}
                      // />
                    ))}
      {/* <div>
        <Checkbox
          checked={this.state.checkboxChecked}
          onChange={this.handleChange} />
        <Button type="button" onClick={this.handleToggle}>Toggle</Button>
        <Button type="button" onClick={this.handleIsItChecked}>Is it checked?</Button>
      </div>                     */}
                      <a href={"/todos/" + todo._id}>
                        <strong>
                          , {todo.done}, {todo.description}, {todo.id}
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
  // handleChange(evt) {
  //   this.setState({ checkboxChecked: evt.target.checked });
  // }
  
  // handleIsItChecked() {
  //   console.log(this.state.checkboxChecked ? 'Yes' : 'No');
  // }
  
  // handleToggle() {
  //   this.setState({ checkboxChecked: !this.state.checkboxChecked });
  // }
}

export default Todos;

import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          id: 1,
          title: "Todo 1",
          isDone: false,
        },
        {
          id: 2,
          title: "Todo 2",
          isDone: false,
        },
      ],
      newTitle: "",
    };
  }
  generateId(list) {
    let id = 0;
    if (list.length > 0) {
      id = list[list.length - 1].id + 1;
    }
    return id;
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.addTodo(this.state.newTitle);
    this.setState({
      newTitle: "",
    });
  };

  addTodo = (title) => {
    this.setState({
      todos: [
        ...this.state.todos,
        { id: this.generateId(this.state.todos), title, isDone: false },
      ],
    });
  };

  changeHandler = (e) => {
    this.setState({
      newTitle: e.target.value,
    });
  };

  changeStatus(id) {
    const changedList = this.state.todos.map((item) => {
      return item.id === id
        ? {
            ...item,
            isDone: !item.isDone,
          }
        : item;
    });
    this.setState({
      todos: changedList,
    });
  }
  deleteItem(id) {
    const updatedTodo = this.state.todos.filter((item) => item.id !== id);
    this.setState({
      todos: updatedTodo,
    });
  }
  onDeleteItem(e, id) {
    console.log(this);
    e.stopPropagation();
    this.deleteItem(id);
  }
  render() {
    return (
      <div className="container">
        <h2>Todo List</h2>
        <div>
          {this.state.todos.map((item) => {
            return (
              <div
                key={item.id}
                className={`item-list ${item.isDone ? "item-done" : ""}`}
                onClick={() => this.changeStatus(item.id)}
              >
                {item.title}
                <button
                  onClick={(e) => this.onDeleteItem(e, item.id)}
                  className="deleteBTN"
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            value={this.state.newTitle}
            onChange={this.changeHandler}
          />
          <button className="addButton">+</button>
        </form>
      </div>
    );
  }
}

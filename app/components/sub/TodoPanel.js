import React, { Component } from "react";

class Todopanel extends Component {
  // Defining a constructor method where we set our initial state
  constructor() {
    super();
    // Setting this.state.todos to our todos array
    this.state = {
      todos: []
    };
    // Binding to this component to have access to 'this'
    this.completedTodos = this.completedTodos.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
  } 
  completedTodos() {
    // Method for indicating task was completed and 
    // making active in the Database return 'false'
    
  }
  renderTodos() {
    // Getting an array of todo items
    const activeTodos = this.state.todos.filter(item => item.active === true);
    
    // Mapping and through our activeTodos and returning one task
    return activeTodos.map(item => (
      <ListItem key={item._id}>
        {item.task}
      </ListItem>
      ));
  }
  render() {
    // Run {this.renderTodos} to return the result of the method
    return (
      <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Todos</h3>
          </div>
          
        <div className="panel-body">
          <ul className="list-group">
            <li className="list-group-item"
            >
            <i
                  onClick={this.completedTodos()}
                  style={styles.completedStyle}
                  className={!this.state.todos.active ? "fa fa-square-o" : "fa fa-square gold" }
                  aria-hidden="true"
                />
            {this.renderTodos()}</li>
        </ul>
      </div>
    </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Todopanel;



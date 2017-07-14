import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoPanel extends Component {

  renderTodos() {
    // Getting a filtered array of items. Boild tasks down to todos. 
    
    const activeTodos = this.props.tasks.filter(item => item.active === true);
    
    //this.setState({ todos: activeTodos });
    return activeTodos.map(task => (
        <TodoItem 
          key={task._id} 
          todo={task} 
          getTodos={this.props.getTodos} 
        />
      ));
  }

  render() {
    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title">Todos</h3>
        </div>
        <div className="panel-body">
          <ul className="list-group">
            {this.renderTodos()}
          </ul>
        </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default TodoPanel;



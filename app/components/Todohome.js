import React, { Component } from "react";
import TodoItem from "./sub/TodoItem";
import Schedule from "./sub/Schedule";
import TodoPanel from "./sub/TodoPanel";
import API from "../utils/api";
import moment from 'moment';

class Home extends Component {
  constructor() {
    super();
    this.state = { 
      tasks: [],
      todoSchedule: []
    };

    this.getTasks = this.getTasks.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
  }

  componentDidMount() {
    this.getTasks();
    this.getSchedule();
  }

  componentDidUpdate() {

  }

  getTasks() {
    //build axios methods
    API.getTasks().then((res) => {
      //activate task if date is today, 
      //created at is in the past. 
      //Avoid activating recurring tasks by how? Complete button should shift task date ahead by one is how.
      //COmplete button should set item.taskdate to NULL for non-recurring, also.  
      res.data.forEach( item => {

          //if missed a recurring, push nextDate forward. 
        if ( item.recurAny === true && moment(item.nextDate).isSame(moment(), 'day') ) {
          const recurBet = item.recurBetween === null ? 1 : item.recurBetween;  //handles if recurXTimes was null in Task Obj. 
          item.taskDate = item.nextDate;
          item.nextDate = moment(item.taskDate).clone().add(recurBet, item.recurFrequency).format();
        }
                //activates true if today        
        if ( item.active === false && moment(item.taskDate).isSame(moment(), 'day') ) {
          item.active = true;
        }
        //Panel will take active & today tasks only. 
      });
      console.log("get Tasks after activated: ", res.data);
      this.setState({ tasks: res.data });
    });
  }

  getSchedule() {
    //INCOMPLETE... 
    //active = false, 
    API.getTasksType(
        { nextDate: { $exists: true } }
      ).then((res) => {
      this.setState({ todoSchedule: res.data })
    });
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h2>My To-do List</h2>
        </div>
          <TodoPanel
            tasks={this.state.tasks}
            getTasks={this.getTasks}
            getSchedule={this.getSchedule}
          />
          <hr/>
          <Schedule 
            tasks={this.state.todoSchedule}
          />
      </div>
    );
  }
}

export default Home;

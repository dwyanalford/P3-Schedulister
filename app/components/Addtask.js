import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import API from "../utils/api";

import 'react-datepicker/dist/react-datepicker.css';

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      desc : "",
      recurs: "", //weekly/montly/yearly
      recurEvery: "", // x days, weeks, months. 
      repeatXTimes: "", //until 0
      date: moment(),
      redirectHome: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleChangeDate(date){
    this.setState({ date: date });
  }

  handleSubmit(event){
    event.preventDefault();
    
    const { desc, recurs, recurEvery, repeatXTimes, date } = this.state;
    var taskObj

    if (recurs === "none" || recurs === "") {
      taskObj = {
        text: desc,
        taskDate: date, //due today, basically, pulled from Component
        recurAmount: 1
      };

    } else {
      const nextDate = date.clone().add(1, 'day').add(recurEvery, recurs);

      console.log("Next date of recur:", nextDate);

      taskObj = {
        text: desc,
        taskDate: date,
        recurAny: true,
        recurFrequency: recurs,
        nextDate: nextDate,
        recurAmount: repeatXTimes
      };
    }

    API.saveTask(taskObj).then( res => {
      console.log("Save task res data:", res.data);
    }).then(
      alert("Task submitted! Change me to a modal you peasant!"),
      this.props.router.push('/')
    );
  } 

  render() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Add a task!</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
               
             <h4>Describe your task</h4>
             <input
               value={this.state.desc}
               type="text"
               className="form-control"
               id="desc"
               onChange={this.handleChange}
               required
             />

             <h4>Recurs</h4><p><i>Not required</i></p>
             <div className="radio">
               <label>
                 <input type="radio" value='none' id='recurs' 
                 checked={this.state.recurs === 'none'}
                 onChange={this.handleChange} />
                 None
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='day' id='recurs'
                 checked={this.state.recurs === 'day'}
                 onChange={this.handleChange} />
                 Daily
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='week' id='recurs'
                 checked={this.state.recurs === 'week'}
                 onChange={this.handleChange} />
                 Weekly
               </label>
             </div>
             <div className="radio">
               <label>
                 <input type="radio" value='month' id='recurs'
                 checked={this.state.recurs === 'month'}
                 onChange={this.handleChange} />
                 Monthly
               </label>
             </div>

              <h4>Recur every{' '}
                <input type="text" pattern="[\d*]" 
                  onInput={this.handleChange}
                  size="2"
                  id="recurEvery"
                  value={this.state.recurEvery} />
                {this.state.recurs  === "none" ? "" : this.state.recurs+"s"}.
              </h4>

              <h4>Repeat for{' '}
                <input type="text" pattern="[\d*]"
                  onInput={this.handleChange}
                  size="2"
                  id="repeatEvery"
                  value={this.state.repeatXTimes} />
                  {this.state.recurs === "none" ? "" : this.state.recurs+"s"}.
              </h4>

              <h4>Task Date</h4>
              <p><i>Start date if recurring, or one time event</i></p>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleChangeDate}
              />
              <hr />
              <button
                 type="submit"
                 className="btn btn-primary"
              >Add task</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddTask;
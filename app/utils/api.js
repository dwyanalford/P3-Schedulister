import axios from "axios";
import moment from "moment";
//api called by components. 
//CALLS ROUTES in api Routes via URL path. 
const API = {

  getTasks: function() {
    return axios.get("/api/tasks");
  },

  //getTasksCondition
  // .get("api/task", query??)
  //where is the best place to conditionalize searches? 
  getTasksType: function(query) {
    return axios.get("/api/tasks", {params: { query: query }});
  },
  //get active tasks
  //get weekly/daily recurring tasks
  //get 'date' tasks. >> Start date, task entered day, for x times

  saveTask: function(task) {
    return axios.post("/api/tasks", task);
  },

  //update task info in here. Callo on axios.patch ._id
  //taskUpdate:

  taskComplete: function(task) {
    task.active = false;  

    //Recurring items, pushes TaskDate forward, calcs NextDate. 
    //works for d/w/m, bi-daily, etc. 
    if (task.recurAny === true) {
      console.log(task.recurBetween);
      const recurBet = task.recurBetween === null ? 1 : task.recurBetween;  //handles if recurXTimes was null in Task Obj. 

      task.taskDate = task.nextDate;//Pushes ahead. Should work????
      task.nextDate = moment(task.taskDate).clone().add(recurBet, task.recurFrequency).format();//oh. Works forward off *new* taskDate. 
    
    //Needs to work for scheduled, one-off items. 
    //If nextdate === null, turn taskDate null. 
    //If taskDate === nextDate, turn taskDate null. 
    //Check "Completed Items Panel" logic. 
    } else if (task.nextDate === task.taskDate) { //scheduled tasks in future. 

      
      //Is this necessary???
      task.taskDate = null;

    } else {
      task.taskDate = null;
    }

    console.log("After complete:", task);

    if (task.recurAny === true) {
      const { _id, active, taskDate, nextDate } = task;
      return axios.patch(`/api/tasks/${_id}`, {active, taskDate, nextDate});
    } else {
      const { _id, active, taskDate } = task;
      return axios.patch(`/api/tasks/${_id}`, { active, taskDate });
    }

  },

  deleteTask: function(id) {
    return axios.delete(`/api/tasks/${id}`);
  },

  taskUpdate: function(task) {
    return axios.patch(`/api/tasks/${_id}`, task);
  },

};

export default API;
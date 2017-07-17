import React from "react";
var moment = require('moment');

const ScheduleItem = (props) => {

  const { text, taskDate } = props.item;

  return (  
    <li className="list-group-item">
      <p>{text} -- Due: {moment(taskDate).format("dddd, MMMM Do YYYY")}</p>
    </li>
)};

export default ScheduleItem;

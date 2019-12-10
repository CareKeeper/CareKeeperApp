import React from 'react';
import axios from 'axios';

class TaskList extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let results = this.props.visit.ADLlist.result;
    if (typeof results == "undefined")
      results = new Array(this.props.visit.ADLlist.order.length).fill(false);
    results[event.target.name] = !results[event.target.name];

    var visit = this.props.visit;
    visit.ADLlist.result = results;
    axios.put('http://localhost:5000/api/visits/' + this.props.visit._id,visit);
    this.forceUpdate();

  }

  render() {

    const tasks = this.props.visit.ADLlist.order;
    let results = this.props.visit.ADLlist.result;
    if (typeof results == "undefined")
      results = new Array(tasks.length).fill(false);
    const data = this.props.data;

    const tasksMap = tasks.map ((number, i) => {
      const task = data[number].task;
      return (
        <div key={number} className="form=group" align="left">
          <h4><label className="checkbox">
            <input
              name={i}
              type="checkbox"
              onChange={this.handleChange}
              checked={results[i]}

            />
            {task}
          </label></h4>
        </div>
      )
    })

    return(
      <div><br />
          <h4>Task List:</h4>
          {tasksMap}</div>
    )
  }
}

export default TaskList;

import React from 'react';

class TaskList extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(i) {
    let results = this.props.visit.ADLlist.result;
    results[i] = !results[i];
  }

  render() {
    if (this.props.visit == null)
      return("");

    const tasks = this.props.visit.ADLlist.order;
    let results = this.props.visit.ADLlist.result;
    if (typeof results == "undefined")
      results = new Array(tasks.length).fill(false);
    const data = this.props.data;
    console.log("TASKS",tasks);
    console.log("RESULTS",results);

    const tasksMap = tasks.map (function(number, i)  {
      console.log("NUMBER",number);
      const task = data[number].task;
      return (
        <div key={number} className="form=group">
          <label className="checkbox">
            <input
              name="task"
              type="checkbox"
              //onChange={this.handleChange}
              checked={results[i]}
            />
            {task}
          </label>
        </div>
      )
    })

    return(
      <div>{tasksMap}</div>
    )
  }
}

export default TaskList;

import React from 'react';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked = () => {
    this.props.handleChange;
    this.props.handleCheck;
  }

  render() {
    const tasks = this.props.taskArray;
    const data = this.props.data;


    const tasksMap = tasks.map (num => {
      const number = num.id;
      const task = data[number].task;
      return (
        <div key={number} className="form-group">
          <label className="checkbox">
            <input
              id={number}
              name={task}
              type="checkbox"
              onChange={this.clicked}
              checked={this.props.task}
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

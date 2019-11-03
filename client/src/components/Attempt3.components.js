import React, { Component } from 'react';

import SelectFrom from './selectFrom.component';
import SelectedTasks from './selectedTasks.component';

class Attempt3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTasks: []
    }
  }
  
  // add clicked name ID to the selectedTasks array
  addTask(id) {
    const newSet = this.state.selectedTasks.concat([id])
    this.setState({
      selectedTasks: newSet
    })
  }
  
  // remove ID from the selectedTasks array
  deleteTask(id) {
    const { selectedTasks } = this.state
    const newList = [
      ...selectedTasks.slice(0, id),
      ...selectedTasks.slice(id + 1)
      ]
    this.setState({
      selectedTasks: newList
    })
  }

  render() {
    return ( 
      <div className="row">
            <div className="col-md-6">
                <h5>Task Options</h5>
                <SelectFrom
                    data={this.props.data} 
                    selectedTasks={this.state.selectedTasks}
                    addTask={this.addTask.bind(this)}
                />
            </div>
            <div className="col-md-6">
                <SelectedTasks 
                    data={this.props.data}
                    selectedTasks={this.state.selectedTasks}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
      </div>
    )
  }
}

export default Attempt3;
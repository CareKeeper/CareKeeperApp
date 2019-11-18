import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SelectFrom from './selectFrom.component';
import SelectedTasks from './selectedTasks.component';
import axios from 'axios';


class TaskLists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTasks: []
    }
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.selectedListName !== prevProps.selectedListName) {
      let findName = this.props.selectedListName;
      console.log("New Select : ", findName);
      console.log("Prev Select : ", prevProps.selectedListName);

      axios.get('http://localhost:5000/api/managers/'+ this.props.currentManager)
        .then(res => {
          let x = res.data.customADLs.find((item) => {
            return item.name === findName;
          })
          console.log('Found customADL Object: ', x);
          if(x) {
            this.setState({
              selectedTasks: x.order
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // add clicked name ID to the selectedTasks array
  addTask(id) {
    const newSet = this.state.selectedTasks.concat([id])
    this.setState({
      selectedTasks: newSet
    },
    () => {
      console.log('Array List:');
      this.state.selectedTasks.forEach((item) => {
        console.log(item);
      })
    });
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

  onCreate() {
    this.props.onSubmit2(this.state.selectedTasks);
  }

  render() {
    return ( 
      <div>
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

        <div className="form-group text-center">
          <Link to={{
                      pathname: "/Caremanager",
                      state: {
                        userID: this.props.currentManager
                      }
            }}>
          <button type="button" className="btn btn-info" onClick={this.onCreate.bind(this)}>Create Custom List</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default TaskLists;
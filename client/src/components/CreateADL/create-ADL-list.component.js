import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dataADL from '../../dataADL';

import TaskLists from './TaskLists.component'

export default class CreateADL extends Component {
  constructor(props) {
    super(props);

    this.onChangeSelectedListName = this.onChangeSelectedListName.bind(this);
    this.onChangeNewListName = this.onChangeNewListName.bind(this);

    this.state = {
        careManagerID: '',
        selectedListName: '',
        selectList: [],
        newListName: '',
    }
  }

  //This should mount all saved lists to the dropdown menu
  componentDidMount() {
    if(this.props.location.state.currentManager) {
      var userID = this.props.location.state.currentManager;
      this.setState({
        careManagerID: userID
      }, () => {
        this.updateCustomLists();
      })
    }
    else{
      this.setState({
        careManagerID: '5dbbb516ad628538809f156c'
      }, () => {
        this.updateCustomLists();
      })
    }
  }

  updateCustomLists(callback) {
    axios.get('http://localhost:5000/api/managers/'+ this.state.careManagerID)
      .then(res => {
        this.setState({
          selectList: res.data.customADLs
        })
      })
      .catch((error) => {
        console.log(error);
      });
    if(callback) callback();
  }

  //passes selectedListName to TaskLists in order to reflect current selection (update lists)
  updateTaskLists() {

  }

  onChangeSelectedListName(e) {
    this.setState({
      selectedListName: e.target.value
    }, () => {
      console.log("current list: ", this.state.selectedListName);
      //console.log("ref value: ", this.refs.listInput.value);
    })
  }

  onChangeNewListName(e) {
    this.setState({
      newListName: e.target.value
    })
    console.log(e.target.value)
  }

  onSubmit2(newList) {
    if(this.state.newListName.length > 0) {
      let newww = {
        customADLs: [{
          name: this.state.newListName,
          order: newList
        }]
      }

      //Pass current manager here. When logged in, manager id will be this.props.managerID
      axios.put('http://localhost:5000/api/managers/'+ this.state.careManagerID, newww)
        .then(res => {
          console.log(res.data);
          this.updateCustomLists(() => { //add new list to dropdown
            this.setState({ //automatically select it
              selectedListName: this.state.newListName
            }, () => {
              this.setState({ //clear new list name area
                newListName: ''
              });
            });
          });
        });

      alert("Your custom list has been added!");
      //window.location = './CareManager'
    }
    else alert("Please add a name to your custom list.");
  }

  onDelete() {
    if(this.state.selectedListName.length > 0) {
      var newww = {
        //marker to choose what type of exports.update in managers.server.controller.js
        deleteCustom: 1,
        selectedListName: this.state.selectedListName
      }

      //Pass current manager here. When logged in, manager id will be this.props.managerID
      axios.put('http://localhost:5000/api/managers/'+ this.state.careManagerID, newww)
        .then(res => {
          console.log(res.data);
          this.updateCustomLists();
        })

      //alert("Your custom list has been deleted!");
    }
  }

  render() {
    return (
    <div class="card">
      <div class="card-body">
      <div className="form-group text-center">
          <Link to={{
                      pathname: "/Caremanager",
                      state: {
                        userID: this.state.careManagerID
                      }
            }}>
          <button type="button" className="btn btn-secondary">Go Back</button>
          </Link>
        </div>
        <h3 className="text-center">Create/Delete ADL Lists</h3><br/>
          <div className="form-group"> 
            <label>Select list: </label>
            <select ref="listInput"
                required
                className="form-control"
                value={this.state.selectedListName}
                onChange={this.onChangeSelectedListName} >
                {
                    this.state.selectList.map(function(item) {
                      return <option key={item._id} value={item.name}>
                              {item.name}
                            </option>;
                    })
                }
            </select>
          </div>
            
          <div className="form-group text-right">
            <button type="button" className="btn btn-danger" onClick={this.onDelete.bind(this)} >
              Delete Selected Custom List
            </button>
          </div>
          <br/>

          <div className="form-group"> 
          <label>Name for New List: (Must be filled in to create list)</label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.newListName}
              onChange={this.onChangeNewListName}
              />
          </div><br/>

          <label>Select from the following: </label>
          <div class="container">
              <TaskLists 
                  currentManager={this.state.careManagerID}
                  data={dataADL} 
                  onSubmit2={this.onSubmit2.bind(this)} 
                  selectedListName={this.state.selectedListName} />
          </div>

          <div className="form-group text-center">
          <Link to={{
                      pathname: "/Caremanager",
                      state: {
                        userID: this.state.careManagerID
                      }
            }}>
          <button type="button" className="btn btn-secondary">Go Back</button>
          </Link>
        </div>
          <br/><br/>

      </div>
    </div>
    )
  }
}




//Attempt 1 Code

/*<label>Select from the following: (Attempt 1 w/ responsive columns)</label>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 left-box">
                        <input type="checkbox" name="activity1" /> Cleaning<br/>
                        <input type="checkbox" name="activity2" /> Assist with bathing<br/>
                    </div>
                    <div class="col-md-6 right-box">
                        <input type="checkbox" name="activity3" /> Food Shopping<br/>
                        <input type="checkbox" name="activity4" /> Meal Prep<br/>
                    </div>
                </div>
            </div><br/><br/>
 */

 
 //Attemp 2 Code

 /*<label>Select from the following: (Attempt 2 w/ single column table)</label>
            <div class="container">
                <div className="tableWrapper">
                    <table className="table table-striped w-auto">
                        <thead className="thead-dark">
                            <tr>
                                <th>C</th>
                                <th>Description</th>
                                <th>C</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td><input 
                                    type="checkbox" 
                                    value="activity1" 
                                    checked={this.state.ADLSettings.activity1} 
                                    onChange={this.onChangeADLSettings}/></td>
                                <td>Cleaning</td>
                                <td><input 
                                    type="checkbox" 
                                    value="activity2" 
                                    checked={this.state.ADLSettings.activity2}/></td>
                                <td>Assist with bathing</td>
                            </tr>
                            <tr>
                                <td><input 
                                    type="checkbox" 
                                    value="activity3" 
                                    checked={this.state.ADLSettings.activity3}/></td>
                                <td>Food Shopping</td>
                                <td><input 
                                    type="checkbox" 
                                    value="activity4" 
                                    checked={this.state.ADLSettings.activity4}/></td>
                                <td>Meal Prep</td>
                            </tr>
                            <tr>
                                <td><input 
                                    type="checkbox" 
                                    value="activity5" 
                                    checked={this.state.ADLSettings.activity5}/></td>
                                <td>Change Bed Linens</td>
                                <td><input 
                                    type="checkbox" 
                                    value="activity6" 
                                    checked={this.state.ADLSettings.activity6}/></td>
                                <td>Mop Floors</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div><br></br>
 */
import React, { Component } from 'react';
import axios from 'axios';

export default class CreateADL extends Component {
  constructor(props) {
    super(props);

    this.onChangeSelectedListName = this.onChangeSelectedListName.bind(this);
    this.onChangeNewListName = this.onChangeNewListName.bind(this);
    this.onChangeADLSettings = this.onChangeADLSettings.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        selectedListName: '',
        selectList: ["Create New List", "DummyList1", "DummyList2"],
        newListName: '',
        ADLSettings: {
            activity1: true,
            activity2: true,
            activity3: true,
            activity4: true,
            activity5: true,
            activity6: true
        }
    }
  }

  //This should mount all saved lists to the dropdown menu
  /*componentDidMount() {
    axios.get('http://localhost:5000/CareManager/savedLists/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            selectList: response.data.map(listADL => listADL.????),
            //username: response.data[0].username ????
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }*/

  onChangeSelectedListName(e) {
    this.setState({
      selectedListName: e.target.value
    })
  }

  onChangeNewListName(e) {
    this.setState({
      newListName: e.target.value
    })
    console.log(e.target.value)
  }

  onChangeADLSettings(e) {
      this.setState({
          ADLSettings: {
              activity1: e.target.checked
          }
      },
      () => console.log("Activity 1 State: " + this.state.ADLSettings.activity1)
      )
  }

  onSubmit(e) {
    e.preventDefault();

    const newADL = {
        newListName: this.state.newListName,
        ADLSettings: this.state.ADLSettings
    }

    console.log(newADL);

    axios.post('http://localhost:5000/careManager/addADL', newADL)
      .then(res => console.log(res.data));

    //backend should then add the new list settings to the dropdown menu


    //have that selected automatically

  }

  render() {
    return (
    <div class="card">
      <div class="card-body">
        <h3>Select ADL List (or create a new one)</h3>
        <form onSubmit={this.onSubmit}>

            <div className="form-group"> 
            <label>Select list: </label>
            <select ref="listInput"
                required
                className="form-control"
                value={this.state.selectedListName}
                onChange={this.onChangeSelectedListName}>
                {
                    this.state.selectList.map(function(item) {
                    return <option 
                        key={item}
                        value={item}>{item}
                        </option>;
                    })
                }
            </select>
            </div><br></br><br></br><br></br><br></br>

            <div className="form-group"> 
            <label>List Name: (if new) (this input will only be submitted if dropdown="Create New List"</label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.newListName}
                onChange={this.onChangeNewListName}
                />
            </div>
            
            <label>Select from the following: (Attempt 1 w/ responsive columns)</label>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 left-box">
                        <input type="checkbox" name="activity1" /> Cleaning<br></br>
                        <input type="checkbox" name="activity2" /> Assist with bathing<br></br>
                    </div>
                    <div class="col-md-6 right-box">
                        <input type="checkbox" name="activity3" /> Food Shopping<br></br>
                        <input type="checkbox" name="activity4" /> Meal Prep<br></br>
                    </div>
                </div>
            </div><br></br><br></br>

            <label>Select from the following: (Attempt 2 w/ single column table)</label>
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

            <div className="form-group">
            <input type="submit" value="Save List" className="btn btn-primary" />
            </div>
        </form>
      </div>
    </div>
    )
  }
}
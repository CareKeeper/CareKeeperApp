//This file loads the visits as well as the patients for the caregiver

import React from 'react';
import axios from 'axios';

class PatientDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      visits: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  changeCurrentPatient() {
    this.props.changeCurrentPatient(this.refs.patientSelect.value);
  };

  updatePatientList(patObjs) {
    this.setState({
      patients: patObjs
    }, () => {
      console.log("PATIENTS OF CAREGIVER: ", this.state.patients);
      this.changeCurrentPatient();
    })
  }

  getPatientList() {
    let pats = this.state.visits.map(v => v.patient);
    let patObjs = [];
    pats.forEach((p,i,arr) => {
      axios.get('http://localhost:5000/api/patients/' + p)
        .then(res => {
          patObjs.push(res.data);
          if(i === (arr.length - 1)) {
            this.updatePatientList(patObjs);
          }
        })
        .catch((error) => console.log("This patient does not exist. ", error));
    })
  };

  updateVisits() {
    let url = 'http://localhost:5000/api/visits/byCaregiver/' + this.props.currentCaregiver;
    axios.get(url)
        .then(res => {
            this.setState({
                visits: res.data
            }, () => {
              this.props.changeCurrentVisits(this.state.visits);
              this.getPatientList()
            });
        })
        .catch(error => {
          console.log("NO PATIENTS FOR THIS CAREGIVER: ", error);
        })
  }

  componentDidUpdate(prevProps) {
    if(this.props.currentCaregiver !== prevProps.currentCaregiver) {
        this.updateVisits();
    }
  }

  handleClick(event) {
    this.setState({
      name: event.target.name
    });
    alert(this.state.name);
    
  }

  render() {
    return (
      <div>
        <div>
          <h6>Current Patient</h6>
          <select className="form-control" ref="patientSelect"
              onChange={this.changeCurrentPatient.bind(this)} >
                {this.state.patients.map(m => 
                    <option key={m._id} value={m._id}>{m.nickname} - CareManagerID: {m.careManager}</option>
                )}
          </select>
        </div>
        
        {/*Don't think we need this portion anymore */}
        <div className="dropdown patient-dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Patient Dropdown
          </button>
            <div className="dropdown-menu" labelledby="dropdownMenuButton">
              <span
                className="dropdown-item"
                name="Patient 1">
                Patient 1
              </span>
              <span
                className="dropdown-item"
                name="Patient 2">
                Patient 2
              </span>
            </div>
          </div>
      </div>

    );
  }
}

export default PatientDropdown;

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

  getCareManagerNames(pats) {
    //for each patient object, retrieve manager name
    return Promise.all(pats.map((p) => {
        return axios.get('http://localhost:5000/api/managers/' + p.careManager);
    })).then(mgs => {
        let pWithNames = pats;
        pWithNames.forEach((p,i) => {
            p.careManagerName = mgs[i].data.username;
            if(i === pWithNames.length - 1) {
                this.updatePatientList(pWithNames);
            }
        })
    })
}

  getPatientList() {
    let patIDs = [...new Set(this.props.visits.map(v => v.patient))];
    
    //for each patient id, retrieve patient object
    return Promise.all(patIDs.map((p) => {
      return axios.get('http://localhost:5000/api/patients/' + p);
    })).then(pats => {
      let newPats = pats.map(p => p.data);
      this.getCareManagerNames(newPats);
    })

    // This is old code replaced by the above code.
    // Reason: Above code ensures that all axios calls are made before moving on.
    // Keeping old code just in case.
    /*
    let patObjs = [];
    pats.forEach((p,i,arr) => {
      axios.get('http://localhost:5000/api/patients/' + p)
        .then(res => {
          patObjs.push(res.data);
          if(i === (arr.length - 1)) {
            this.getCareManagerNames(patObjs);
          }
        })
        .catch((error) => console.log("This patient does not exist. ", error));
    })*/
  };

  componentDidUpdate(prevProps) {
    if(this.props.visits !== prevProps.visits) {
      if(this.props.visits !== null) {
        this.getPatientList();
      }
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
          <h6>Current Patient</h6>
          <select className="form-control" ref="patientSelect"
              onChange={this.changeCurrentPatient.bind(this)} >
                {this.state.patients.map(m => 
                    <option key={m._id} value={m._id}>{m.careManagerName}'s {m.nickname}</option>
                )}
          </select>
        </div>

    );
  }
}

export default PatientDropdown;

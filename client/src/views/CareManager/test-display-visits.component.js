import React from 'react';
import axios from "axios";
import CSVExport from "../../components/CSVExport";


export default class TestDisplayVisits extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        visitsWithNames: [],
        currenPatientName: ''
      };
    }

    componentDidUpdate(prevProps) {
      if(this.props.currentPatient !== prevProps.currentPatient || this.props.visits !== prevProps.visits) {
        if(this.props.visits !== null) this.getVisitsOfPatient();
      }
    }

    getVisitsOfPatient() {
        let patsOnly = [];
        this.props.visits.forEach((v,i,arr) => {
            if(v.patient === this.props.currentPatient) {
                patsOnly.push(v);
            }
            if(i === (arr.length - 1)) {
                this.getNames(patsOnly);
            }
        })
    }

    changeDisplayedVisit(v) {
        this.props.changeDisplayedVisit(v);

    }

    getNames(patsOnly) {
        let newList = patsOnly;
        
        patsOnly.forEach((v,i,arr) => {
            //get patient name
            axios.get('http://localhost:5000/api/patients/' + v.patient)
                .then(res => {
                    newList[i].patientName = res.data.nickname;
                    //get caregiver name
                    axios.get('http://localhost:5000/api/caregivers/' + v.caregiver)
                    .then(res2 => {
                        newList[i].caregiverName = res2.data.username;
                    })
                    .then(() => {
                        if(i === (arr.length - 1)) {
                            return this.updateVisitsWithNames(newList);
                        }
                    })
                    .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        })
    }

    updateVisitsWithNames(newList) {
        this.setState({
            visitsWithNames: newList,
            currentPatientName: newList[0].patientName
        }, () => console.log("PATIENT VISITS WITH NAMES: ", this.state.visitsWithNames))
    }
  
  
    render() {
        var visits = null;
        if(this.state.visitsWithNames != null) {
            if(this.state.visitsWithNames.length > 0) {
                visits = this.state.visitsWithNames.map((v,i) => {
                    return (
                        <div><ol key={i}>
                            <li className="text-left">Caregiver: {v.caregiverName}</li>
                            <li className="text-left">Scheduled Date: {v.scheduledDate}</li>
                            <li className="text-left">Notes: {v.managerNotes}</li>
                        </ol>
                        <button onClick={this.changeDisplayedVisit.bind(this, v)}>Show ADL List</button>
                        <br /></div>
                    )
                })
            }
            else visits = "No Visits to Display.";
        }

      return (
  
          <div className="test-text">
              <h3 className="text-center">Displaying All Visits for {this.state.currentPatientName}</h3>
              {visits}
          </div>
        
      );
    }
  }
  


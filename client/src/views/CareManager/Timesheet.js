import React from 'react';
import axios from "axios";


export default class Timesheet extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        visitsWithNames: []
      };
    }

    updateVisitsWithNames(newList) {
        this.setState({
            visitsWithNames: newList
        }, () => console.log("VISITS WITH NAMES: ", this.state.visitsWithNames))
    }

    getNames() {
        let newList = this.props.visits;
        
        this.props.visits.forEach((v,i,arr) => {
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

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
      if(this.props.visits !== prevProps.visits) {
        this.getNames();
      }
    }
  
  
    render() {
        var visits = null;
        if(this.state.visitsWithNames != null) {
            if(this.state.visitsWithNames.length > 0) {
                visits = this.state.visitsWithNames.map((v,i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{v.caregiverName}</th>
                            <td>{v.patientName}</td>
                            <td>{v.scheduledDate}</td>
                            <td>{v.scheduledStartTime} - {v.scheduledFinishTime}</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    )
                })
            }
            else visits = "No Visits to Display.";
        }

      return (

        <div>
            <h3 className="text-center">Timesheet</h3>
            <div className="timesheet-table">
                <table class="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Caregiver</th>
                            <th>Patient</th>
                            <th>Date</th>
                            <th>Scheduled Time</th>
                            <th>Actual Time</th>
                            <th>Hours Worked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visits}
                    </tbody>
                </table>
            </div>
        </div>
        
      );
    }
  }
  


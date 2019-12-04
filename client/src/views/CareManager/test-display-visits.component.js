import React from 'react';
import axios from "axios";


export default class TestDisplayVisits extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        visitsList: null
      };
    }

    componentDidMount() {
        //this.getVisits();
    }

    componentDidUpdate(prevProps) {
      if(this.props.currentPatient !== prevProps.currentPatient) {
        this.getVisits();
      }
    }

    getVisits(callback) {
        axios.get('http://localhost:5000/api/visits/byPatient/'+ this.props.currentPatient)
            .then(res => {
                console.log("RETRIEVED VISITS: ", res);
                this.setState({
                    visitsList: res.data
                }, () => {
                    console.log("VISITS: ", this.state.visitsList);
                })
            })
            .catch((error) => {
                console.log("No visits: ", error);
            });
        if(callback) callback();
    }
  
  
    render() {
        var visits = null;
        if(this.state.visitsList != null) {
            if(this.state.visitsList.length > 0) {
                visits = this.state.visitsList.map((v,i) => {
                    return (
                        <ol key={i}>
                            <li className="text-left">Caregiver: {v.caregiver}</li>
                            <li className="text-left">Scheduled Date: {v.scheduledDate}</li>
                            <li className="text-left">Notes: {v.managerNotes}</li>
                        </ol>
                    )
                })
            }
            else visits = "No Visits to Display.";
        }

      return (
  
          <div className="row">
              <h3>Display Visits of Patient</h3>
              {visits}
          </div>
        
      );
    }
  }
  


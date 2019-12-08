import React from 'react';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

import PatientDropdown from './PatientDropdown.js';
import CaregiverLogArea from './CaregiverLogArea.js';
import RecentLogs from './RecentLogs.js'
import WorkSched from './WorkSchedule.js'
import CaregiverCheckboxArea from './CaregiverCheckboxArea.js';
import Calendar from '../../components/AppCalendar.js';
import '../../stylesheets/Caregiver.css';
import data from '../../dataADL';


//function that takes Okta Token and links to Atlas database by email (for now)
function OktaToAtlas(email) {
    try {
        axios.get('http://localhost:5000/api/caregivers/')
            .then(res => {
                res.data.forEach(m => {
                    try {
                        if(m.email.toLowerCase() === email.toLowerCase()) {
                            this.setState({
                                userID: m._id
                            }, () => console.log("USERID UPDATED: ", this.state.userID));
                        }
                    }
                    catch {
                        console.log("There is an Atlas Manager without an email.");
                    }
                })
            })
    }
    catch {
        console.log("ERROR with getting managers from Atlas.");
        alert("You do not have an Atlas account set up with your Okta account.");
        window.location = './';
    }
}

async function checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated && !this.state.userinfo) {
      const userinfo = await this.props.auth.getUser();
      this.setState({ userinfo });
      console.log("OKTA Email: ", this.state.userinfo.email);
      this.OktaToAtlas(this.state.userinfo.email);
    }
  }

class CaregiverOfficial extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        userinfo: null,
        userID: null,
        currentPatient: "",
        visits: null,
        displayedVisit: null
    };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.OktaToAtlas = OktaToAtlas.bind(this);
  }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        //this.checkAuthentication();
    }

    changeCurrentPatient(_id) {
      this.setState(
          {
              currentPatient: _id
          });
    }

    changeCurrentVisits(v) {
      if (v != null) {
          this.setState(
              {
                  visits: v,
                  displayedVisit: v[0]
              }, () => console.log("VISITS UPDATED: ", this.state.visits));
      }
    }

  render() {
    console.log("Current Okta Caregiver: ", this.state.userinfo);
    console.log("Current AtlasID: ", this.state.userID);
    console.log("Current Patient ID: ", this.state.currentPatient);
    return (
      <div className="App">
        {/* Navbar with logo */}
        <header className="App-header">
          <div className="container-fluid">
            <div className="page-wrapper">
              <div className="component-wrapper LHS-wrapper">
                < PatientDropdown 
                    currentCaregiver={this.state.userID} 
                    changeCurrentPatient={this.changeCurrentPatient.bind(this)}
                    changeCurrentVisits={this.changeCurrentVisits.bind(this)} />
                < CaregiverLogArea />
                < RecentLogs />
              </div>
              <div className="component-wrapper RHS-wrapper">
                < CaregiverCheckboxArea
                  data={data}
                  visit={this.state.displayedVisit} />
              </div>
            </div>
            <div className="page-wrapper">
              <div className="component-wrapper">
                < Calendar />
              </div>
            </div>
            <div className="page-wrapper">
              <div className="component-wrapper">
                < WorkSched visits={this.state.visits}/>
              </div>
            </div>
          </div>
        </header>
      </div>

    );
  }
}

export default withAuth(CaregiverOfficial);

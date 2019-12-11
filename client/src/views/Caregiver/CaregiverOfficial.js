import React from 'react';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

import PatientDropdown from './PatientDropdown.js';
import CaregiverLogArea from './CaregiverLogArea.js';
import RecentLogs from './RecentLogs.js'
//import WorkSched from './WorkSchedule.js'
import CaregiverCheckboxArea from './CaregiverCheckboxArea.js';
import CalendarArea from './CalendarArea.js'
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
                            }, () => {
                              console.log("USERID UPDATED: ", this.state.userID)
                              this.getVisits();
                            });
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
        console.log("Current Patient ID: ", _id);
        this.setState(
            {
                currentPatient: _id
            });

        if (this.state.visits != null) {
            const date = new Date();
            let yy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            if (dd < 10) {
                dd = '0' + dd;
            }

            let concatDate = yy + '-' + mm + '-' + dd;
            var todaysvisits = this.state.visits.filter(visit => {
                return visit.patient === _id && visit.scheduledDate === concatDate;
            });

            this.setState(
                {displayedVisit: todaysvisits[0]}
            )
        }

    }

    changeDisplayedVisit(v) {
        this.setState(
            {displayedVisit: v}
        )
    }

    //Next 3 functions copied from Care Manager Official with modifications
    getVisits() {
      let url = 'http://localhost:5000/api/visits/byCaregiver/' + this.state.userID;
      axios.get(url)
          .then(res => {
              this.getPatientNames(res.data);
          })
          .catch(error => {
              console.log(error);
          })
    }

    getPatientNames(vis) {
        //for each visit, retrieve patient name and add it to visit
        return Promise.all(vis.map((v) => {
            return axios.get('http://localhost:5000/api/patients/' + v.patient);
        })).then(pats => {
            let vWithNames = vis;
            vWithNames.forEach((v,i) => {
                v.patientName = pats[i].data.nickname;
                if(i === vWithNames.length - 1) {
                    this.getCareManagerNames(vWithNames);
                }
            })
        })
    }

    getCareManagerNames(vis) {
        //for each visit, retrieve caregiver name and add it to visit
        return Promise.all(vis.map((v) => {
            return axios.get('http://localhost:5000/api/managers/' + v.careManager);
        })).then(mgs => {
            let vWithNames = vis;
            vWithNames.forEach((v,i) => {
                v.careManagerName = mgs[i].data.username;
                if(i === vWithNames.length - 1) {
                    this.updateVisits(vWithNames);
                }
            })
        })
    }

    updateVisits(vWithNames) {
        this.setState({
            visits: vWithNames
        }, () => console.log("Visits with Names: ", this.state.visits))
    }

    changeCurrentVisits(v) {

          /*this.setState(
              {
                  visits: v

              }, () => console.log("VISITS UPDATED: ", this.state.visits));*/
      }


  render() {
    return (
      <div className="App">
        {/* Navbar with logo */}
        <header className="App-header">
          <div className="container-fluid">
            <div className="page-wrapper">
              <div className="component-wrapper LHS-wrapper">
                < PatientDropdown
                    visits={this.state.visits}
                    currentCaregiver={this.state.userID}
                    changeCurrentPatient={this.changeCurrentPatient.bind(this)}
                    changeCurrentVisits={this.changeCurrentVisits.bind(this)} />
                < CaregiverLogArea
                    visit={this.state.displayedVisit} />
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
                < CalendarArea visits={this.state.visits}
                changeDisplayedVisit={this.changeDisplayedVisit.bind(this)}/>
              </div>
            </div>
            <div className="page-wrapper">
              <div className="component-wrapper">
                {/*For testing, Displays ALL Visits for ALL Patients of this caregiver*/}
                {/*< WorkSched visits={this.state.visits}/>*/}
              </div>
            </div>
          </div>
        </header>
      </div>

    );
  }
}

export default withAuth(CaregiverOfficial);

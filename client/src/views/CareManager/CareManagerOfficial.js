import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';
import '../../stylesheets/Caremanager.css';

import PatientSelect from './patientSelect.component';
import CreatePatient from './create-patient.component'
import EditPatient from './edit-patient.component'
import ScheduleVisits from './ScheduleVisits';
import Invite from './Invite'
import Notes from "./Notes"
import CSVExport from "../../components/CSVExport";
//import DoubleButton from '../../components/googleCalendar';
import NewCalendar from './NewCalendar';
import TestDisplayVisits from './test-display-visits.component';
import Timesheet from './Timesheet';
import CaregiverCheckboxArea from "../Caregiver/CaregiverCheckboxArea";
import data from "../../dataADL";

//function that takes Okta Token and links to Atlas database by email (for now)
function OktaToAtlas(email) {
    try {
        axios.get('http://localhost:5000/api/managers/')
            .then(res => {
                res.data.forEach(m => {
                    try {
                        if(m.email.toLowerCase() === email.toLowerCase()) {
                            this.setState({
                                userID: m._id
                            }, () => {
                                console.log("USERID UPDATED: ", this.state.userID);
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

class CareManagerOfficial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null,
            userID: null,
            visits: null,
            currentPatient: "",
            displayedVisit: null
        }
        this.checkAuthentication = checkAuthentication.bind(this);
        this.OktaToAtlas = OktaToAtlas.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {

    }

    changeDisplayedVisit(v) {
        this.setState(
            {displayedVisit: v}
        )
    }

    getVisits() {
        console.log("GET VISITS: ");
        let url = 'http://localhost:5000/api/visits/byManager/' + this.state.userID;
        axios.get(url)
            .then(res => {
                this.setState({
                    visits: res.data
                }, () => {
                    console.log("VISITS FOR THIS CARE MANAGER: ", this.state.visits);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    changeCurrentPatient(_id) {
        this.setState(
            {
                currentPatient: _id
            });
    }

    render() {
        console.log("Current Okta Manager: ", this.state.userinfo);
        console.log("Current AtlasID: ", this.state.userID);
        console.log("Current Patient ID: ", this.state.currentPatient);
        return (

            <div className="App">

                <header className="App-header">

                    <div className="container">
                        <div className="row item-space">
                            <div className = "col">
                            <PatientSelect
                                currentManager = {this.state.userID}
                                changeCurrentPatient={this.changeCurrentPatient.bind(this)}
                                currentPatient = {this.state.currentPatient}/>
                            </div>
                            <div className="col-lg-3 align-self-end">
                                <CreatePatient currentManager = {this.state.userID} changeCurrentPatient={this.changeCurrentPatient.bind(this)}/>
                            </div>
                            <div className="col-lg-3 align-self-end">
                                <EditPatient currentPatient = {this.state.currentPatient} />
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row text-center">
                            <div className="col-lg-3 align-self-end">
                                <Link to={{
                                        pathname: "/CreateADL",
                                        state: {
                                            currentManager: this.state.userID
                                        }
                                    }}>
                                    <Button color="primary" block>Create ADL List</Button>
                                </Link>
                            </div>
                            <div className="col-lg-3 align-self-end">
                                <ScheduleVisits
                                    currentManager={this.state.userID}
                                    currentPatient={this.state.currentPatient}/>
                            </div>
                            <div className="col-lg-3 align-self-end">
                                <Invite/>
                            </div>
                            <div className="col-lg-3 align-self-end">
                                <Notes/>
                            </div>
                        </div>
                    </div>


                    <div className="container component-wrapper">
                        <br/>
                        <NewCalendar
                        visits={this.state.visits}
                        currentPatient={this.state.currentPatient}
                        changeDisplayedVisit={this.changeDisplayedVisit}
                        />
                    </div>

                    <div className="container component-wrapper">
                        < CaregiverCheckboxArea
                            data={data}
                            visit={this.state.displayedVisit} />
                    </div>


                    <div className="container component-wrapper">
                        {/*THIS DISPLAYS VISITS BY CURRENTLY SELECTED PATIENT */}
                        <TestDisplayVisits
                            currentPatient={this.state.currentPatient}
                            visits={this.state.visits}
                            changeDisplayedVisit={this.changeDisplayedVisit.bind(this)}/>
                    </div>

                    <div className="container component-wrapper">
                        {/*THIS DISPLAYS ALL CARE MANAGER VISITS */}
                        <Timesheet visits={this.state.visits}/>
                    </div>

                </header>
            </div>


        )
    };
}

export default withAuth(CareManagerOfficial);

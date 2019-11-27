import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';


import PatientSelect from './patientSelect.component';
import CreatePatient from './create-patient.component'
import EditPatient from './edit-patient.component'
import Invite from './Invite'
import Notes from "./Notes"
import ScheduleVisits from './ScheduleVisits';
import DoubleButton from '../../components/googleCalendar';
import NewCalendar from './NewCalendar';
import '../../stylesheets/Caremanager.css';

async function checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated && !this.state.userinfo) {
      const userinfo = await this.props.auth.getUser();
      this.setState({ userinfo });
    }
  }

class CareManagerOfficial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null,
            userID: '5dbc93bf7cb768464dbfac8c',
            currentUserEmail: '',
            currentPatient: ""
        }
        this.checkAuthentication = checkAuthentication.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }
    
    async componentDidUpdate() {
        this.checkAuthentication();
    }

    changeCurrentPatient(_id) {
        this.setState(
            {
                currentPatient: _id
            });
    }

    render() {
        //console.log("Current manager ID: ", this.props.location.state.userID);
        console.log("Current manager: ", this.state.userinfo);
        console.log("Current patient ID: ", this.state.currentPatient)
        return (

            <div className="App">

                <header className="App-header">
                    
                    <div className="row text-center">

                        <div className="col-lg-3">
                            <PatientSelect currentManager = {this.state.userID} changeCurrentPatient={this.changeCurrentPatient.bind(this)}/>
                        </div>
                        <div className="col-lg-3 align-self-end">
                            <CreatePatient currentManager = {this.state.userID} />
                        </div>
                        <div className="col-lg-3 align-self-end">
                            <EditPatient currentPatient = {this.state.currentPatient} />
                        </div>
                        <div className="col-lg-3 align-self-end">
                            <Invite/>
                        </div>
                        <div className="col-lg-3 align-self-end">
                            <Notes/>
                        </div>
                        <div className="col-lg-3 align-self-end">
                            <Link to={{
                                    pathname: "/create_ADL",
                                    state: {
                                        currentManager: this.state.userID
                                    }
                                }}>
                                <Button color="secondary" block>Create ADL List</Button>
                            </Link>
                        </div>
                        <div className="col-lg-3 align-self-end">
                            <ScheduleVisits/>
                        </div>

                    </div>


                    <div className="container-fluid">
                        <div className="page-wrapper">
                            <div className="component-wrapper LHS-wrapper">

                                <DoubleButton/>
                                <br/>
                                <NewCalendar/>
                            </div>
                            <div className="component-wrapper RHS-wrapper">
                            </div>
                        </div>

                    </div>
                </header>
            </div>


        )
    };
}

export default withAuth(CareManagerOfficial);
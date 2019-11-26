import React from 'react';
import PatientSelect from './patientSelect.component';
import CreatePatient from './create-patient.component'
import EditPatient from './edit-patient.component'
import Invite from './Invite'
import Notes from "./Notes"
import ScheduleVisits from './ScheduleVisits';
import DoubleButton from '../../components/googleCalendar';
import NewCalendar from './NewCalendar';
import '../../stylesheets/Caremanager.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';


class Caremanager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPatient: ""
        }

    }

    changeCurrentPatient(_id) {
        this.setState(
            {
                currentPatient: _id
            });
    }

    render() {
        console.log("Current manager ID: ", this.props.location.state.userID);
        console.log("Current patient ID: ", this.state.currentPatient)
        return (

            <div className="App">

                <header className="App-header">
                    
                    <div className="row text-center">

                        <div className="col-lg-3">
                            <PatientSelect currentManager = {this.props.location.state.userID} changeCurrentPatient={this.changeCurrentPatient.bind(this)}/>
                        </div>
                        <div className="col-lg-3 align-self-end">
                            <CreatePatient currentManager = {this.props.location.state.userID} />
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
                                        currentManager: this.props.location.state.userID
                                    }
                                }}>
                                <Button color="secondary" block>Create ADL List</Button>
                            </Link>
                        </div>
                        <div className="col-lg-3 align-self-end">
                            <ScheduleVisits currentManager={this.props.location.state.userID}/>
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
export default Caremanager;
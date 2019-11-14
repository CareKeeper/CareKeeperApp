import React from 'react';
import Dropdown from '../components/Dropdown';
import Invite from '../views/Invite'
import Notes from "./Notes"
import ScheduleVisits from '../views/ScheduleVisits';
import DoubleButton from '../components/googleCalendar';
import NewCalendar from '../views/NewCalendar';
import '../stylesheets/Caremanager.css';


class Caremanager extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.location.state.userID);
        return (

            <div className="App">

                <header className="App-header">
                    <br/>
                    <div className="row text-center">

                        <div className="col-lg-3">
                            <Dropdown/>
                        </div>
                        <div className="col-lg-3">
                            <Invite/>
                        </div>
                        <div className="col-lg-3">
                            <Notes/>
                        </div>
                        <div className="col-lg-3">
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
export default Caremanager;
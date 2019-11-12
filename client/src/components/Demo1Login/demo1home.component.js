import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ManagerAdd from './ManagerAdd';
import ManagerSelect from './ManagerSelect';
import CareGiverAdd from './CareGiverAdd';
import CareGiverSelect from './CareGiverSelect';

import PatientAdd from '../TestingComponents/PatientAdd';
import ManagerShowPatients from '../TestingComponents/ManagerShowPatients';

class Demo1Home extends React.Component {
	state = {
        currentManager: "",
        currentCareGiver: ""
	}

	changeCurrentManager(_id) {
		this.setState(
			{
				currentManager: _id
			});
		console.log("Current Manager ID: ", _id);
    }
    
    changeCurrentCareGiver(_id) {
        this.setState(
            {
                cuurrentCareGiver: _id
            }
        );
        console.log("Current Care Giver ID: ", _id);
    }

	render() {

		return (
				<div>
                    <div className="row">
                        <div className="col">
                            <h3 class="text-center">Login as Care Manager</h3>
                            <ManagerAdd />
                            <ManagerSelect changeCurrentManager={this.changeCurrentManager.bind(this)}/><br/>
                            <div className="text-center">
                                <Link to={{
                                    pathname: "/UpdateThis", //ADD MILENAS COMPONENT
                                    state: {
                                        userID: this.state.currentManager
                                    }
                                }}>
                                    <button type="button" class="btn btn-primary btn-lg">Log In</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col">
                            <h3 class="text-center">Login as Care Giver</h3>
                            <CareGiverAdd />
                            <CareGiverSelect changeCurrentCareGiver={this.changeCurrentCareGiver.bind(this)}/><br/>
                            <div className="text-center">
                                <Link to={{
                                    pathname: "/UpdateThis", //ADD LESLEYS COMPONENT
                                    state: {
                                        userID: this.state.currentCareGiver
                                    }
                                }}>
                                    <button type="button" class="btn btn-primary btn-lg">Log In</button>
                                </Link>
                            </div>
                        </div>
                    </div>
				</div>
		);
	}
}
export default Demo1Home;

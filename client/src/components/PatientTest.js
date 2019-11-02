import React from 'react';
import axios from 'axios';
import PatientAdd from './PatientAdd';
import ManagerAdd from './ManagerAdd';
import ManagerSelect from './ManagerSelect';
import PatientShowAll from './PatientShowAll';
import ManagerShowPatients from './ManagerShowPatients';

class PatientTest extends React.Component {
	state = {
		currentManager: ""
	}

	changeCurrentManager(_id) {
		this.setState(
			{
				currentManager: _id
			});
	}

	render() {

		return (
				<div>
				<ManagerAdd />
				<ManagerSelect changeCurrentManager={this.changeCurrentManager.bind(this)}/>
				<PatientAdd currentManager={this.state.currentManager}/>
				<ManagerShowPatients currentManager={this.state.currentManager}/>
				</div>
		);
	}
}
export default PatientTest;

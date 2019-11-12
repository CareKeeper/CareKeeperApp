import React from 'react';
import axios from 'axios';
import PatientAdd from './PatientAdd';
import ManagerAdd from '../Demo1Login/ManagerAdd';
import ManagerSelect from '../Demo1Login/ManagerSelect';
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
		console.log(_id);
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

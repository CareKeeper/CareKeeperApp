import React from 'react';
import axios from 'axios';
import PatientAdd from './PatientAdd';
import PatientShowAll from './PatientShowAll';

class PatientTest extends React.Component {


	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value



		return (
				<div>
				<PatientAdd />
				<PatientShowAll />
				</div>
		);
	}
}
export default PatientTest;

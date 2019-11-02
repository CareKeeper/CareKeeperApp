import React from 'react';
import axios from 'axios';

class PatientAdd extends React.Component {
	addPatient() {
		const patient = {nickname: this.refs.nicknameText.value,
							careManager: this.props.currentManager,
							medications: []};

		axios.post('http://localhost:5000/api/patients/', patient)
  .then(res => console.log(res.data));
	}

	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value

		return (
			<div class="card">
			<h4 class="card-header">Add Patient</h4>
			<div class="card-body">
				<div class="form-group">
					<label>Nickname</label>
					<input class="form-control" ref="nicknameText" placeholder="ABC" />
				</div>
				<button type="button" class="btn btn-primary" onClick={this.addPatient.bind(this)}>Add</button>
			</div></div>
		);
	}
}
export default PatientAdd;

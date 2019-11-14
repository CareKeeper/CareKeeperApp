import React from 'react';
import axios from 'axios';

class CareGiverAdd extends React.Component {
	addCareGiver() {
		const careGiver = {username: this.refs.usernameText.value,
							email: this.refs.emailText.value
						    };

		axios.post('http://localhost:5000/api/caregivers/', careGiver)
  .then(res => console.log(res.data));
	}

	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value

		return (
			<div class="card">
			<h6 class="card-header">Add Caregiver</h6>
			<div class="card-body">
				<div class="form-group">
					<label>Username</label>
					<input class="form-control" ref="usernameText" placeholder="username" />
					<label>Email</label>
					<input class="form-control" ref="emailText" placeholder="email" />
				</div>
				<button type="button" class="btn btn-secondary" onClick={this.addCareGiver.bind(this)}>Add</button>
			</div></div>
		);
	}
}
export default CareGiverAdd;

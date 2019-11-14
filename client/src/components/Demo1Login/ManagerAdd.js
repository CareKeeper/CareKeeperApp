import React from 'react';
import axios from 'axios';

class ManagerAdd extends React.Component {
	addManager() {
		const manager = {username: this.refs.usernameText.value,
							email: this.refs.emailText.value,
							medications: []};

		axios.post('http://localhost:5000/api/managers/', manager)
  .then(res => console.log(res.data));
	}

	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value

		return (
			<div class="card">
			<h6 class="card-header">Add Manager</h6>
			<div class="card-body">
				<div class="form-group">
					<label>Username</label>
					<input class="form-control" ref="usernameText" placeholder="username" />
					<label>Email</label>
					<input class="form-control" ref="emailText" placeholder="email" />
				</div>
				<button type="button" class="btn btn-secondary" onClick={this.addManager.bind(this)}>Add</button>
			</div></div>
		);
	}
}
export default ManagerAdd;

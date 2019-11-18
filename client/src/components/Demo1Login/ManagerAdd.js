import React from 'react';
import axios from 'axios';

class ManagerAdd extends React.Component {
	addManager() {
		const manager = {username: this.refs.usernameText.value,
							email: this.refs.emailText.value,
							medications: []};

		axios.post('http://localhost:5000/api/managers/', manager)
  			.then(res => console.log(res.data));
		
		alert('You are now registered. Please select your name.');
		window.location = './';
	}

	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value

		return (
			<div className="card">
				<h6 className="card-header">Add Manager</h6>
				<div className="card-body">
					<div className="form-group">
						<label>Username</label>
						<input className="form-control" ref="usernameText" placeholder="username" />
						<label>Email</label>
						<input className="form-control" ref="emailText" placeholder="email" />
					</div>
					<button type="button" className="btn btn-secondary" onClick={this.addManager.bind(this)}>Add</button>
				</div>
			</div>
		);
	}
}
export default ManagerAdd;

import React from 'react';
import axios from 'axios';

class ManagerSelect extends React.Component {
	state = {
		managers: []
	}

	changeCurrentManager() {
		this.props.changeCurrentManager(this.refs.managerSelect.value);
	};

	updateManagerList() {
		axios.get('http://localhost:5000/api/managers/')
			.then(res => {
				this.setState({
					managers: res.data
				});
				this.changeCurrentManager();
			});


	}

	componentDidMount() {
		this.updateManagerList();
	}

	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value

		return (
			<div class="card">
			<h6 class="card-header">Select Manager</h6>
				<div class="card-body">
					<select class="form-control" ref="managerSelect"
						onChange={this.changeCurrentManager.bind(this)} >
						{this.state.managers.map(m =>
							<option value={m._id}>{m.username}</option>)}
					</select>
				</div>
			</div>
		);
	}
}
export default ManagerSelect;

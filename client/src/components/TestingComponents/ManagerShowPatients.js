import React from 'react';
import axios from 'axios';
var mongoose = require('mongoose');

class ManagerShowPatients extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			patients: []
		};
	}

	getPatients() {
		let id;
		if (this.props.currentManager) {
			id = mongoose.Types.ObjectId(this.props.currentManager);
		}
		let url = 'http://localhost:5000/api/patients/byManager/' + id
		axios.get(url)
			.then(res => {
				const patients = res.data;
				console.log(patients);
				this.setState({patients});
			});
	}

	componentDidMount() {
		this.getPatients();
	}

	componentDidUpdate(prevProps) {
		if (this.props.currentManager !== prevProps.currentManager) {
			this.getPatients();
		}
	}

	render() {
		console.log("CurrentManager: " + this.props.currentManager);

		return (
			<div class="card">
			<h4 class="card-header">Patient List</h4>
				<div class="card-body">
					<table><tbody>
						<tr>
							<td>Patient</td>
							<td>Care Manager</td>
						</tr>
						{this.state.patients.map(p =>
							<tr>
								<td>{p.nickname}</td>
								<td>{p.careManager}</td>
							</tr>)
						}
					</tbody></table>
				</div>
			</div>
		);
	}
}
export default ManagerShowPatients;

import React from 'react';
import axios from 'axios';

class PatientShowAll extends React.Component {
	state = {
		patients: []
	}

	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value
		axios.get('http://localhost:5000/api/patients/')
			.then(res => {
				const patients = res.data;
				this.setState({patients});
			});


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
export default PatientShowAll;

import React from 'react';
import axios from 'axios';

class CareGiverSelect extends React.Component {
	state = {
		careGivers: []
	}

	changeCurrentCareGiver() {
		this.props.changeCurrentCareGiver(this.refs.careGiverSelect.value);
	};

	updateCareGiverList() {
		axios.get('http://localhost:5000/api/caregivers/')
			.then(res => {
				this.setState({
					careGivers: res.data
				});
				this.changeCurrentCareGiver();
			});
	}

	componentDidMount() {
		this.updateCareGiverList();
	}

	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value

		return (
			<div className="card">
				<h6 className="card-header">Select Caregiver</h6>
                <div className="card-body">
					<select className="form-control" ref="careGiverSelect"
						onChange={this.changeCurrentCareGiver.bind(this)} >
						{this.state.careGivers.map(cg =>
							<option key={cg._id} value={cg._id}>{cg.username}</option>)}
					</select>
				</div>
			</div>
		);
	}
}
export default CareGiverSelect;

import React from 'react';
import axios from 'axios';

class PatientSelect extends React.Component {
    state = {
        patients: []
    }

    changeCurrentPatient() {
        this.props.changeCurrentPatient(this.refs.patientSelect.value);
    };

    updatePatientList() {
        let url = 'http://localhost:5000/api/patients/byManager/' + this.props.currentManager;
        axios.get(url)
            .then(res => {
                this.setState({
                    patients: res.data
                });
            });
    }

    componentDidMount() {
        this.updatePatientList();
    }

    render() {

        return (
                <div >
                    <h6>Select Patient</h6>
                    <select class="form-control" ref="patientSelect"
                            onChange={this.changeCurrentPatient.bind(this)} >
                        {this.state.patients.map(m =>
                            <option value={m._id}>{m.nickname}</option>)}
                    </select>
                </div>
        );
    }
}
export default PatientSelect;

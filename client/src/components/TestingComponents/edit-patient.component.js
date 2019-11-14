import React, { Component } from 'react';
import axios from 'axios';

export default class EditPatient extends Component {
  constructor(props) {
    super(props);

    this.onChangeNickname = this.onChangeNickname.bind(this);
    this.onChangeMedications = this.onChangeMedications.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nickname: '',
      careManager: 0,
      medications: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/careManager/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          nickanme: response.data.nickname,
          medications: response.data.medications
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeNickname(e) {
    this.setState({
      nickname: e.target.value
    })
  }

  onChangeMedications(e) {
    this.setState({
      medications: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const patient = {
      nickname: this.state.nickname,
      careManager: this.state.careManager,
      medications: this.state.medications,
    }

    console.log(patient);

    axios.post('http://localhost:5000/patients/edit/' + this.props.match.params.id, patient)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Patient Info</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Nickname: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.nickname}
              onChange={this.onChangeNickname}
              />
        </div>
        <div className="form-group"> 
          <label>Medication List: </label>
          {/*<input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />*/}
            <textarea className="form-control"
                rows="4"
                col="50"
                name="medList">Free form medication list...
            </textarea>
        </div>

        <div className="form-group">
          <input type="submit" value="Confirm Changes" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
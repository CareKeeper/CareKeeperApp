import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class EditPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      nickname: '',
      notes: '',
      medications: '',
      currentPatient: ''
    }

    this.toggle = this.toggle.bind(this);
    this.onChangeNickname = this.onChangeNickname.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.onChangeMedications = this.onChangeMedications.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.currentPatient !== prevProps.currentPatient) {
      axios.get('http://localhost:5000/api/patients/' + this.props.currentPatient)
        .then(res =>  {
          this.setState({
            nickname: res.data.nickname,
            notes: res.data.notes
            //medications
          });
        })
    }
  }

  toggle() {


    this.setState({
      modal: !this.state.modal
    })
  }
  onChangeNickname(e) {
    this.setState({
      nickname: e.target.value
    })
  }
  onChangeNotes(e) {
    this.setState({
      notes: e.target.value
    })
  }
  onC
  onChangeMedications(e) {
    this.setState({
      medications: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const patient = {
      nickname: this.state.nickname,
      notes: this.state.notes,
      //medications: this.state.medications,
      careManager: this.props.currentManager,
    }

    console.log(patient);

    axios.post('http://localhost:5000/api/patients', patient)
      .then(res => console.log(res.data));

    //window.location = '/';
    this.toggle();
  }

  render() {
    return (

      <div>
        <Button color="secondary"  onClick={this.toggle} block>Edit Patient</Button>
        <Modal isOpen={this.state.modal}>
          <form onSubmit={this.onSubmit}>
            <ModalHeader>Edit Patient</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="form-group col-md-4">
                  <label>Nickname:</label>
                  <input required type="text" value={this.state.nickname} onChange={this.onChangeNickname} className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Notes (Medications):</label>
                    <input type="text" value={this.state.notes} onChange={this.onChangeNotes} className="form-control" />
                  </div>
                </div>
              </ModalBody>
            <ModalFooter>
              <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
              <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </form>
          </Modal>

              {/*<textarea className="form-control"
                  rows="4"
                  col="50"
                  name="medList">Free form medication list...
               </textarea>*/}
          
      </div>
    )
  }
}
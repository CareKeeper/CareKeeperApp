import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import CareGiverSelect from '../../components/Demo1Login/CareGiverSelect';


export default class ScheduleVisits extends React.Component {
    constructor(props) {
      super(props);
      this.state = { modal: false,name: '',email: ''};
  
      this.toggle = this.toggle.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
    handleChangeName(event) {
      this.setState({name: event.target.value});
    }
   
    handleChangeEmail(event) {
      this.setState({email: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
       }

    changeCurrentCareGiver(_id) {
        this.setState(
            {
                currentCareGiver: _id
            }
        );
        console.log("Current Care Giver ID: ", _id);
    }
  
  
    render() {
      return (
  
          <div>
          <Button color="secondary"  onClick={this.toggle} block>Schedule Visits</Button>
          <Modal isOpen={this.state.modal}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader>Schedule Visits</ModalHeader>
            <ModalBody>
            <div className="row">
              <div className="form-group col-md-4">
              <label>Caregiver:</label>
              <CareGiverSelect changeCurrentCareGiver={this.changeCurrentCareGiver.bind(this)}/>
                </div>
                </div>
             
              <div className="row">
               <div className="form-group col-md-4">
                <label>Email:</label>
                  <input type="text" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" />
                 </div>
                </div>
                <Form>
            <FormGroup>
            <Label for="InputDate">Date</Label>
                <Input
                type="date"
                name="date"
                id="InputDate"
                placeholder="date placeholder"
                />
                <Label for="Time">From:</Label>
                <Input
                type="time"
                name="time"
                id="Time"
                placeholder="time placeholder"
                />
                <Label for="Time">To:</Label>
                <Input
                type="time"
                name="time"
                id="Time"
                placeholder="time placeholder"
                />

                <Label for="Text">Text Area</Label>
                <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
              <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
              <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </form>
          </Modal>
          </div>
        
      );
    }
  }
  


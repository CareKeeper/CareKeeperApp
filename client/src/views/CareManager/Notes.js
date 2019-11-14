import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Notes extends React.Component {
    constructor(props) {
      super(props);
      this.state = { modal: false, notes: ''};
  
      this.toggle = this.toggle.bind(this);
      this.handleChangeNotes = this.handleChangeNotes.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
    handleChangeNotes(event) {
      this.setState({notes: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
       }
  
  
    render() {
      return (
  
          <div>
          <Button color="secondary"  onClick={this.toggle} block>Add Notes</Button>
          <Modal isOpen={this.state.modal}>
            <ModalHeader>Add Notes</ModalHeader>
            <ModalBody>
            <Form>
            <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input type="textarea" value={this.state.name} onChange={this.handleChangeNotes}name="text" id="exampleText" />
            </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
              <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
              <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          </div>
        
      );
    }
  }

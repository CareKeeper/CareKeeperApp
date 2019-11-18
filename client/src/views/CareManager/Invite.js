import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Invite extends React.Component {
    constructor(props) {
      super(props);
      this.state = { modal: false,name: '',email :''};
  
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
  
  
    render() {
      return (
  
          <div>
          <Button color="secondary"  onClick={this.toggle} block>Invite Caregiver</Button>
          <Modal isOpen={this.state.modal}>
            <form onSubmit={this.handleSubmit}>
            
            <ModalHeader>Invite Caregiver</ModalHeader>
              <ModalBody>
              <div className="row">
              <div className="form-group col-md-4">
              <label>Name:</label>
              <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" />
              </div>
              </div>
             
              <div className="row">
              <div className="form-group col-md-4">
              <label>Email:</label>
              <input type="text" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" />
              </div>
              </div>
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
  

  //https://appdividend.com/2018/03/30/react-bootstrap-modal-example-tutorial/
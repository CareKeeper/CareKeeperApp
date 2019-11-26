import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import CareGiverSelect from '../../components/Demo1Login/CareGiverSelect';
import axios from "axios";


export default class ScheduleVisits extends React.Component {
    constructor(props) {
      super(props);
      this.state = { modal: false,name: '',email: '', selectList: [], date: Date};
  
      this.toggle = this.toggle.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);


    }

    addVisit() {
        const visit = {
            scheduledStart: this.refs.Date



        }


    }

    componentDidMount() {
        this.updateCustomLists();
        this.setState({date: Date()});
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

    updateCustomLists(callback) {
        axios.get('http://localhost:5000/api/managers/'+ this.props.currentManager)
            .then(res => {
                this.setState({
                    selectList: res.data.customADLs
                }
                )
                console.log(this.state.selectList);
            })
            .catch((error) => {
                console.log(error);
            });
        if(callback) callback();
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
                </div>
                <Form>
            <FormGroup>
            <Label for="InputDate">Date</Label>
                <Input
                type="date"
                name="date"
                id="InputDate"
                value={this.state.date}
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
                <label>Saved ADL List: </label>
                <select ref="listInput"
                        required
                        className="form-control"
                        value={this.state.selectedListName}>
                    {
                        this.state.selectList.map(function(item) {
                            return <option key={item._id} value={item.name}>
                                {item.name}
                            </option>;
                        })
                    }
                </select>

                <Label for="Text">Notes to Caregiver:</Label>
                <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
              <input type="submit" value="Submit" color="primary" className="btn btn-primary"
                     onClick={this.addVisit.bind(this)}/>
              <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </form>
          </Modal>
          </div>
        
      );
    }
  }
  


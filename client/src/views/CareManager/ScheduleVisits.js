import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import CareGiverSelect from '../../components/Demo1Login/CareGiverSelect';
import axios from "axios";


export default class ScheduleVisits extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        modal: false,
        name: '',
        email: '', 
        selectList: [], 
        date: Date,
        currentCareGiver: '',
        selectedListName: ''
      };
  
      this.toggle = this.toggle.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeSelectedListName = this.onChangeSelectedListName.bind(this);


    }

    addVisit() {
        const visit = {
            scheduledStart: this.refs.Date



        }

      this.toggle();


    }

    componentDidMount() {
        //this.updateCustomLists();
        this.setState({date: Date()});
    }

    componentDidUpdate(prevProps) {
      if(this.props.currentManager !== prevProps.currentManager) {
        this.updateCustomLists();
      }
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
        console.log("Current SELECTED Care Giver ID: ", _id);
    }

    updateCustomLists(callback) {
        console.log("IS THIS WORKING: ", this.props.currentManager);
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

    onChangeSelectedListName(e) {
      this.setState({
        selectedListName: e.target.value
      }, () => {
        console.log("Current SELECTED list: ", this.state.selectedListName);
      })
    }
  
  
    render() {
      return (
  
          <div>
          <Button color="secondary"  onClick={this.toggle} block>Schedule Visit</Button>
          <Modal isOpen={this.state.modal}>
              <ModalHeader>Schedule Visit</ModalHeader>

              <ModalBody>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <CareGiverSelect changeCurrentCareGiver={this.changeCurrentCareGiver.bind(this)}/>
                  </div>
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
                    <label>ADL List: </label>
                    <select ref="listInput"
                      required
                      className="form-control"
                      value={this.state.selectedListName}
                      onChange={this.onChangeSelectedListName} >
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
                <Button color="primary" onClick={this.addVisit.bind(this)}>Submit</Button>
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
          </Modal>
          </div>
        
      );
    }
  }
  


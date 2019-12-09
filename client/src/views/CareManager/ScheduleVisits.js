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
        patientName: '',

        date: Date,

        justDate: null,
        startTime: null,
        endTime: null,
        currentCareGiver: '',
        selectedListIndex: '',
        selectedListObject: [],
        selectList: [],
        notes: ''
      };
  
      this.toggle = this.toggle.bind(this);
      this.onChangeJustDate = this.onChangeJustDate.bind(this);
      this.onChangeStartTime = this.onChangeStartTime.bind(this);
      this.onChangeEndTime = this.onChangeEndTime.bind(this);
      this.onChangeSelectedListName = this.onChangeSelectedListName.bind(this);
      this.onChangeNotes = this.onChangeNotes.bind(this);
    }

    addVisit() {
      const visit = {
        //scheduledStart: this.refs.Date,

        scheduledDate: this.state.justDate,
        scheduledStartTime: this.state.startTime,  //required to submit, value for testing only
        scheduledFinishTime: this.state.endTime,

        careManager: this.props.currentManager,
        patient: this.props.currentPatient,
        caregiver: this.state.currentCareGiver,
        ADLlist: {
          name: this.state.selectedListObject.name,
          order: this.state.selectedListObject.order,
          result: new Array(this.state.selectedListObject.order.length).fill(false)
        },
        managerNotes: this.state.notes
      }
      console.log(visit.ADLlist);

      axios.post('http://localhost:5000/api/visits/', visit)
        .then(res => {
          console.log("Visit Saved: ", res.data);
          alert("Your visit has been scheduled.");
        })
        .catch((error) => {
          console.log("Visit not saved: ", error);
        });

      this.toggle();
    }

    componentDidMount() {
        this.setState({date: Date()});
    }

    componentDidUpdate(prevProps) {
      if(this.props.currentManager !== prevProps.currentManager) {
        this.updateCustomLists();
      }
      if(this.props.currentPatient !== prevProps.currentPatient) {
        //get Patient Name
        axios.get('http://localhost:5000/api/patients/' + this.props.currentPatient)
          .then(res => {
            this.setState({
              patientName: res.data.nickname
            },() => console.log("Current Patient Name: ", this.state.patientName))
          })
          .catch((error) => {
            console.log("Patient not able to be retrieved: ", error);
          });
      }
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    changeCurrentCareGiver(_id) {
        this.setState({
                currentCareGiver: _id
        }, () => {
          console.log("Current SELECTED Care Giver ID: ", this.state.currentCareGiver);
        });
    }

    updateCustomLists(callback) {
        axios.get('http://localhost:5000/api/managers/'+ this.props.currentManager)
            .then(res => {
                this.setState({
                    selectList: res.data.customADLs
                })
            })
            .catch((error) => {
                console.log(error);
            });
        if(callback) callback();
    }

    onChangeJustDate(e) {
      this.setState({
        justDate: e.target.value
      }, () => console.log("JUST DATE: ", this.state.justDate))
    }

    onChangeStartTime(e) {
      this.setState({
        startTime: e.target.value
      }, () => console.log("START TIME: ", this.state.startTime))
    }

    onChangeEndTime(e) {
      this.setState({
        endTime: e.target.value
      }, () => console.log("END TIME: ", this.state.endTime))
    }

    onChangeSelectedListName(e) {
      this.setState({
        selectedListIndex: e.target.value,
        selectedListObject: this.state.selectList[e.target.value]
      }, () => {
        console.log("Current SELECTED list Index: ", this.state.selectedListIndex);
        console.log("Current SELECTED list Object: ", this.state.selectedListObject);
      })
    }

    onChangeNotes(e) {
      this.setState({
        notes: e.target.value
      })
    }
  
  
    render() {
      return (
  
          <div>
          <Button color="primary"  onClick={this.toggle} block>Schedule Visit</Button>
          <Modal isOpen={this.state.modal}>
              <ModalHeader>Schedule Visit for {this.state.patientName}</ModalHeader>

              <ModalBody>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <CareGiverSelect changeCurrentCareGiver={this.changeCurrentCareGiver.bind(this)}/>
                  </div>
                </div>
                
                <Form>
                  <FormGroup>
                    <Label for="Just Date">Date</Label>
                    <Input
                      type="date"
                      id="Just Date"
                      value={this.state.justDate}
                      onChange = {this.onChangeJustDate}
                    />
                    <Label for="Start Time">From:</Label>
                    <Input
                      type="time"
                      id="Start Time"
                      value = {this.state.startTime}
                      onChange = {this.onChangeStartTime}
                      placeholder="time placeholder"
                    />
                    <Label for="End Time">To:</Label>
                    <Input
                      type="time"
                      id="End Time"
                      value = {this.state.endTime}
                      onChange = {this.onChangeEndTime}
                      placeholder="time placeholder"
                    />
                    <label>ADL List: </label>
                    <select ref="listInput"
                      required
                      className="form-control"
                      value={this.state.selectedListIndex}
                      onChange={this.onChangeSelectedListName} >
                    {
                      this.state.selectList.map(function(item, index) {
                          return <option key={index} value={index}>
                              {item.name}
                            </option>;
                      })
                    }
                    </select>
                    <Label for="Text">Notes to Caregiver:</Label>
                    <Input type="textarea"
                      value={this.state.Notes} 
                      onChange={this.onChangeNotes} />
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
  


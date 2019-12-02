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
        date: Date,
        currentCareGiver: '',
        selectedListIndex: '',
        selectedListObject: [],
        selectList: [],
        notes: ''
      };
  
      this.toggle = this.toggle.bind(this);
      this.onChangeSelectedListName = this.onChangeSelectedListName.bind(this);
      this.onChangeNotes = this.onChangeNotes.bind(this);
    }

    addVisit() {
      const visit = {
        //scheduledStart: this.refs.Date,
        scheduledStart: this.state.date,
        scheduledFinish: this.state.date,
        

        patient: this.props.currentPatient,
        caregiver: this.state.currentCareGiver,
        ADLlist: {
          name: this.state.selectedListObject.name,
          order: this.state.selectedListObject.order
        },
        managerNotes: this.state.notes
      }

      axios.post('http://localhost:5000/api/visits/', visit)
        .then(res => console.log(res.data))
        .catch((error) => {
          console.log(error);
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
  


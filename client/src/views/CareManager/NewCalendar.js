import React from 'react'
import AddEventsCalendar from './AddEventsCalendar';
import Calendar from 'react-calendar';
import Events from '../../calendarEvents';
import { bool } from 'prop-types';
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody,
   ModalFooter, ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading
  } from 'reactstrap';


class NewCalendar extends React.Component {
    constructor(props) {
      super(props);
      let today = new Date();
      let yy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      let wholeDate = yy + '-' + mm + '-' + dd;
      let hh = today.getHours();
      let min = today.getMinutes();
      let wholeTime = hh + ':' + min;

      this.state = {
        date: new Date(),
        newyy : yy,
        newDate: wholeDate,
        newTime: wholeTime,
        visitsWithNames: [],
        currenPatientName: '',
        modal: false
      }
      this.onChange = this.onChange.bind(this);
      this.toggle = this.toggle.bind(this);

    }

    onChange = date => {
      let yy = date.getFullYear();
      let mm = date.getMonth() + 1;
      let dd = ("0" + date.getDate()).slice(-2);
      let concatDate = yy + '-' + mm + '-' + dd;
      this.setState({
        date: date,
        newDate: concatDate,
        clicked: true
       });
     console.log(this.onClick)

    }


    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
    componentDidUpdate(prevProps) {
      if(this.props.currentPatient !== prevProps.currentPatient || this.props.visits !== prevProps.visits) {
        if(this.props.visits !== null) this.getVisitsOfPatient();
      }
    }

    updateVisitsWithNames(newList) {
      this.setState({
          visitsWithNames: newList,
          currentPatientName: newList[0].patientName
      }, () => console.log("PATIENT VISITS WITH NAMES: ", this.state.visitsWithNames))
  }

    getNames(patsOnly) {
      let newList = patsOnly;

      patsOnly.forEach((v,i,arr) => {
          //get patient name
          axios.get('http://localhost:5000/api/patients/' + v.patient)
              .then(res => {
                  newList[i].patientName = res.data.nickname;
                  //get caregiver name
                  axios.get('http://localhost:5000/api/caregivers/' + v.caregiver)
                  .then(res2 => {
                      newList[i].caregiverName = res2.data.username;
                  })
                  .then(() => {
                      if(i === (arr.length - 1)) {
                          return this.updateVisitsWithNames(newList);
                      }
                  })
                  .catch(error => console.log(error));
              })
              .catch(error => console.log(error));
      })
  }
    getVisitsOfPatient() {
      let patsOnly = [];
      this.props.visits.forEach((v,i,arr) => {
          if(v.patient === this.props.currentPatient) {
              patsOnly.push(v);
              console.log(v.patient)

          }
          if(i === (arr.length - 1)) {
              this.getNames(patsOnly);
          }
      })
  }

  changeDisplayedVisit(v) {
    this.props.changeDisplayedVisit(v);
  }


    render() {

      console.log(this.state.clicked)
      console.log(this.props.visits)
      var val = false
      var tempDate = null
      const getDates = this.state.visitsWithNames.map((item, i) =>{
        if(item.scheduledDate === this.state.newDate){
          val = this.state.clicked
          tempDate = this.state.newDate
          return(
            <div key = {i}>
            {item.scheduledDate}
            </div>
          )
        }
      })
      var visits = null;
      if(this.state.visitsWithNames != null) {
          if(this.state.visitsWithNames.length > 0) {
              visits = this.state.visitsWithNames.map((v, i) => {
                if(v.scheduledDate === tempDate) {
                return (
                    <div className = "row">
                      <div className="col-md-6">
                       <ListGroup className = "col-11">
                        <ol key={i}>
                          <ListGroupItem >
                          <ListGroupItemHeading className="text-left">Caregiver </ListGroupItemHeading>
                          <ListGroupItemText> {v.caregiverName} </ListGroupItemText>
                          <ListGroupItemHeading className="text-left">Scheduled Date </ListGroupItemHeading>
                          <ListGroupItemText> {v.scheduledDate }</ListGroupItemText>
                          <ListGroupItemHeading className="text-left">Notes </ListGroupItemHeading>
                          <ListGroupItemText>{v.managerNotes}</ListGroupItemText>
                          <ListGroupItemHeading className="text-left">Scheduled Time </ListGroupItemHeading>
                          <ListGroupItemText> From: {v.scheduledStartTime }</ListGroupItemText>
                          <ListGroupItemText> To: {v.scheduledFinishTime }</ListGroupItemText>
                          </ListGroupItem>
                        </ol>
                        </ListGroup>
                      </div>
                    </div>

                  )
                }
              })
          }
          else visits = "No Visits to Display.";
      }

      console.log(val);

      const divStyle = {
        float: 'left',
        marginRight: '2em'
      }

      const visitStyle = {
        fontSize: '15px',
      }

    return (

          <div>
            <div style={divStyle}>
              <Calendar
                onChange={this.onChange}
                value={this.state.date}
              />
            </div>


            <div>
              <h6>Visits:</h6>
              <div style={visitStyle}>
                {visits}
              </div>
            </div>


      </div>
      );
    }
}

export default NewCalendar;

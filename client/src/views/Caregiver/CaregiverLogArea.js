import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";
import axios from "axios";

class CaregiverLogArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null
    }


    this.handleCheckinSubmit = this.handleCheckinSubmit.bind(this);
    this.handleCheckoutSubmit = this.handleCheckoutSubmit.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
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

  handleCheckinSubmit() {

    var visit = this.props.visit;

    visit.actualStart = this.state.startTime;
    console.log("actual start", visit.actualStart);

    axios.put('http://localhost:5000/api/visits/' + this.props.visit._id,visit);

  }



  handleCheckoutSubmit() {

    var visit = this.props.visit;

    visit.actualFinish = this.state.endTime;

    axios.put('http://localhost:5000/api/visits/' + this.props.visit._id,visit);

  }


    render() {
      return (
        <div className="checkin_out">
          {/* Checkin form */}
            <div className="form-group">
              <Label for="Start Time">From:</Label>
              <Input
                  type="time"
                  id="Start Time"
                  value = {this.state.startTime}
                  onChange = {this.onChangeStartTime}
                  placeholder="time placeholder"
              />

            <button  onClick={this.handleCheckinSubmit} className="btn btn-primary">Check In</button>
            </div>

          {/* Checkout form */}
            <div className="form-group">
              <Label for="End Time">To:</Label>
              <Input
                  type="time"
                  id="End Time"
                  value = {this.state.endTime}
                  onChange = {this.onChangeEndTime}
                  placeholder="time placeholder"
              />
            </div>

            <button onClick={this.handleCheckoutSubmit} className="btn btn-primary">Check Out</button>

        </div>
      )
    }
}

export default CaregiverLogArea;

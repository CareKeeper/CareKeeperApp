import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Events from '../calendarEvents';

class AppCalendar extends Component {
  constructor(props) {
    super(props);
    let today = new Date();
    let yy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let wholeDate = mm + '/' + dd + '/' + yy;
    let hh = today.getHours();
    let min = today.getMinutes();
    let wholeTime = hh + ':' + min;

    this.state = {
      date: new Date(),
      newDate: wholeDate,
      newTime: wholeTime,
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange = date => {
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let concatDate = mm + '/' + dd + '/' + yy;
    this.setState({
      date: date,
      newDate: concatDate
     });
     console.log(this.state.newTime);
  }

  render() {

    const mapEvents = Events.map((item,i) => {
      if (item.date === this.state.newDate) {
        return (
          <div key={this.state.time}>
            <div className="row">
              {item.time}
            </div>
            <div className="row">
              {item.details}
            </div>
          </div>
        )
      }
      else {
        return (
          <span key={i}> </span>
        )
      }
    })

    return (
      <div className="row">
        <div className="col-md-6">
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
        <div className="col-md-6">
          {mapEvents}
        </div>
      </div>
    );
  }
}

export default AppCalendar;

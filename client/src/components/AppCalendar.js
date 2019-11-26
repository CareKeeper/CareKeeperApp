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

    this.state = {
      date: new Date(),
      newDate: wholeDate,
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
  }

  render() {

    const mapEvents = Events.map( item => {
      if (item.date === this.state.newDate) {
        return (
          <div key={this.state.date}>{item.details}</div>
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

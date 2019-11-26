import React, { Component } from 'react';
import Calendar from 'react-calendar';

class AppCalendar extends Component {
  constructor(props) {
    super(props);
    let today = new Date();
    let yy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let wholeDate = mm + '/' + dd + '/' + yy;

    state = {
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
    //const { value } = this.state;
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          newDate={this.state.newDate}
        />
      </div>
    );
  }
}

export default AppCalendar;

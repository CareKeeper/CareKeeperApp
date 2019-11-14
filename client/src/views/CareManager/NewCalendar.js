import Calendar from 'react-calendar'
import React from 'react';

class NewCalendar extends React.Component {
    state = {
      date: new Date(),
    }
   
    onChange = date => this.setState({ date })
   
    render() {
      return (
        <div>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
      );
    }
  }
  export default NewCalendar

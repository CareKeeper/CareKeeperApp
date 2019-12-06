import React from 'react'
import AddEventsCalendar from './AddEventsCalendar';
import Calendar from 'react-calendar/dist/entry.nostyle';
import Events from '../../calendarEvents';

class NewCalendar extends React.Component {
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
        newyy : yy,
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
       console.log(this.state.newyy);

    }
  
    render() {
      
      const mapEvents = Events.map( item => {
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
          <div className= "col-md-6">
            <AddEventsCalendar newDate={this.state.newDate}/>
          </div>

        </div>
      );
    }
  }
  
  export default NewCalendar

import React from 'react';
import Calendar from 'react-calendar'

class CalendarArea extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    let yy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) {
      dd = '0' + dd;
    }
    let wholeDate = yy + '-' + mm + '-' + dd;
    let hh = today.getHours();
    let min = today.getMinutes();
    let wholeTime = hh + ':' + min;

    this.state = {
      date: new Date(),
      newDate: wholeDate,
      newTime: wholeTime,
      visits: null,
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.visits !== prevProps.visits) {
      this.setState({
        visits: this.props.visits
      })
    }
  }

  onChange = date => {
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) {
      dd = '0' + dd;
    }
    let concatDate = yy + '-' + mm + '-' + dd;
    this.setState({
      date: date,
      newDate: concatDate
     });
  }

  changeDisplayedVisit(v) {
    this.props.changeDisplayedVisit(v);

  }

    render() {

      const divStyle = {
        float: 'left',
        marginRight: '2em'
      }

      const visitStyle = {
        fontSize: '15px',
      }

      var visits;

      if(this.state.visits !== null) {
        visits = this.state.visits.map((v,i) => {
          let thisVisit = v.scheduledDate;
          if(this.state.newDate === thisVisit) {
            return (
              <div className="text-left" key={i}>
                <h6>Visit on {v.scheduledDate} with {v.patientName}</h6>
                <ul key={i}>
                  <li>Caregiver: {v.caregiverName}</li>
                  <li>Start at: {v.scheduledStartTime}</li>
                  <li>End at: {v.scheduledFinishTime}</li>
                  <li>Notes: {v.managerNotes}</li>
                </ul>
                {/* <button onClick={this.changeDisplayedVisit.bind(this, v)}>Show ADL List</button> */}
              <br />
              </div>
            )
          }
        })
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
            <br/>>
            <h6>Visits On This Day:</h6>
            <div style={visitStyle}>
              {visits}
            </div>
          </div>
        </div>
      )
    }
}

export default CalendarArea;

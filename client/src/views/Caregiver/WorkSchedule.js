import React from 'react';

class WorkSched extends React.Component {

    render() {

      var visits;

      if(this.props.visits !== null) {
        visits = this.props.visits.map(v => {
          return (
            <div className="text-left">
              <h6>Visit on {v.scheduledDate}</h6>
              <ul>
                <li>With Patient#: {v.patient}</li>
                <li>Start at: {v.scheduledStartTime}</li>
                <li>End at: {v.scheduledFinishTime}</li>
                <li>Notes: {v.managerNotes}</li>
                <li>ADL List Order: {v.ADLlist.order.map(n => n + " ")}</li>
              </ul>
            </div>
          )
        })
      }

      return (
        <div>
          <h4>Work Schedule</h4>
          <h6>(Lists ALL Visits for ALL patients)</h6>
          <div style={{fontSize: "15px"}}>
            {visits}
          </div>
        </div>
      )
    }
}

export default WorkSched;

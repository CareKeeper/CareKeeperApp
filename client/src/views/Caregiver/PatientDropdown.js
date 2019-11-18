import React from 'react';

class PatientDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      name: event.target.name
    });
    alert(this.state.name);
    
  }

  render() {
    return (
      <div>
        <div className="dropdown patient-dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Patient Dropdown
          </button>
            <div className="dropdown-menu" labelledby="dropdownMenuButton">
              <span
                className="dropdown-item"
                name="Patient 1">
                Patient 1
              </span>
              <span
                className="dropdown-item"
                name="Patient 2">
                Patient 2
              </span>
            </div>
          </div>
      </div>

    );
  }
}

export default PatientDropdown;

import React from 'react';


class Dropdown extends React.Component {
constructor(props){
 super(props);

 this.state = {
       name: "",
     };

  this.handleClick = this.handleClick.bind(this);

}

handleClick(event) {
    this.setState({
      name: event.target.name
    });
  }

  


  render() {
    return (
    

      <div className="dropdown ">
      <button className="btn btn-secondary  dropdown-toggle >" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        See Patients
      </button>
    
      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a className="dropdown-item" href="#">Patient 1</a>
        <a className="dropdown-item" href="#">Patient 2</a>
      </div>
      </div>

      
    );
  }
}

export default Dropdown;


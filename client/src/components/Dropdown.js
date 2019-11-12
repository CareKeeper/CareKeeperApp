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
    

      <div class="dropdown ">
      <button class="btn btn-secondary  dropdown-toggle >" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        See Patients
      </button>
    
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" href="#">Patient 1</a>
        <a class="dropdown-item" href="#">Patient 2</a>
      </div>
      </div>

      
    );
  }
}

export default Dropdown;


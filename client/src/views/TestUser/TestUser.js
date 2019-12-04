import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TestUser extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
  };

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    console.log("idToken: ", idToken.idToken)
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name,
    });
  }

  render() {
    const { currentUserEmail, currentUserName } = this.state;

    return (
      <div>
        <h1>Welcome {currentUserName}</h1>
        <p>Email: {currentUserEmail}</p>
        <p>You have reached the authorized user area of the portal</p>
        <p><Link to="/CareManagerOfficial" className="nav-link">Care Manager Dashboard</Link></p>
      </div>
    );
  }
}

export default TestUser;
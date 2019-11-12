import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;

    const button = this.state.authenticated ?
      <button onClick={() => {this.props.auth.logout()}}>Logout</button> :
      <button onClick={() => {this.props.auth.login()}}>Login</button>;

    return (
      <div>
        <Link to='/'>Home</Link><br/>
        <Link to='/user'>User</Link><br/>
        {button}
        <div className="todoList">
            <ul>To do:
                <li>FIX Internal error message</li>
                <li>Caregiver signup button</li>
                <li>Logout button inside the user page</li>
                <li>Widget in dev mode - change to production when deploying</li>
            </ul>
        </div>
      </div>
    );
  }
});
import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';

function LinkTo(userType) {
    console.log("LinkTo", userType);
    if(userType.toLowerCase() == "care manager") {
        window.location = './user'
    }
    else if((userType.toLowerCase() == "caregiver") || (userType.toLowerCase() == "care giver")) {
        window.location = './CaregiverOfficial'
    }
    else {
        console.log("Account Type NOT DETECTED.");
        window.location = './'
    }
}

async function checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated && !this.state.userinfo) {
      const userinfo = await this.props.auth.getUser();
      this.setState({ userinfo });
      this.LinkTo(this.state.userinfo.userType);
    }
  }

class LogInClassification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: null,
        }
        this.checkAuthentication = checkAuthentication.bind(this);
        this.LinkTo = LinkTo.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    render() {
        return (
            <div>
                <p>Logging in...</p>
            </div>
        )
    };
}

export default withAuth(LogInClassification);
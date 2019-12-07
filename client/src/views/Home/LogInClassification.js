import React from 'react';
import { withAuth } from '@okta/okta-react';

function LinkTo(userType) {
    console.log("LinkTo", userType);
    if(userType.toLowerCase() === "care manager") {
        window.location = './CareManagerOfficial'
    }
    else if((userType.toLowerCase() === "caregiver") || (userType.toLowerCase() === "care giver")) {
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
                <p>Loading...</p>
            </div>
        )
    };
}

export default withAuth(LogInClassification);
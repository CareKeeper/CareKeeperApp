import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Navbar from './components/Navbar/Navbar';
import Home from "./views/Home/Home";
import Login from './components/Authentication/Login';
import TestUser from './views/Users/TestUser';

function onAuthRequired({history}) {
  history.push('/login');
}

class App extends Component {
  render () {
    return (
      <Router>
        <Security issuer='https://dev-454334.okta.comDashboard/oauth2/default'
                    clientId='0oa1rnx5pw6YOvfOP357'
                    redirectUri={window.location.origin + '/implicit/callback'}
                    onAuthRequired={onAuthRequired}
                    pkce={true} >
          <div>
            <Navbar />
              <div className ="container">
                <Route path='/' exact={true} component={Home} />
                <SecureRoute path='/user' component={TestUser} />
                <Route path='/login' render={() => <Login baseUrl='https://dev-454334.okta.comDashboard/oauth2/default' />} />
                <Route path='/implicit/callback' component={ImplicitCallback} />  
              </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;

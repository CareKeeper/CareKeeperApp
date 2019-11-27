import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import config from './config/config';

//import Home from './views/Home/Home';
import Logo from "./components/logo.component";
import Navbar from "./components/TestingComponents/navbar.component"
import Navbar2 from "./components/loginButton.component";

import CareManagerOfficial from './views/CareManager/CareManagerOfficial'

import TestUser from './views/TestUser/TestUser';
import Demo1Home from "./components/Demo1Login/demo1home.component";
import Caremanager from './views/CareManager/Caremanager';
import CaregiverPage from "./views/Caregiver/Caregiver";
import PatientTest from "./components/TestingComponents/PatientTest"
import CreateADL from "./components/CreateADL/create-ADL-list.component"
//import NotFound from "./views/NotFound"
//import Header from "./components/Header/Header"


const App = () => {
	// Can use this switch statement to have a "single page app" that shows different things based on the url
  return (
    <Router>
        <Logo />
        <Navbar/>

        <Switch>
          <Security {...config.oidc}>
            <Navbar2 /><br/><br/>
            {/*<Route exact path="/" component={Home}/>*/}

            <div className="container">
              {/*Default Page*/}
              <Route exact path ="/">Default Page</Route>
              <Route path='/implicit/callback' component={ImplicitCallback}/>

              {/*Secure Pages*/}
              <SecureRoute path="/CareManagerOfficial" component={CareManagerOfficial} />

              {/*Test Pages*/}
              <Route exact path="/user" component={TestUser} />
              <Route exact path="/Demo1Home" component={Demo1Home} />
              <Route exact path="/CareManager" component={Caremanager} />
                  <Route exact path="/create_ADL" component={CreateADL} />
              <Route exact path="/Caregiver" component={CaregiverPage} />

              {/*Other*/}
                <Route exact path="/PatientTestPage" component={PatientTest} />
                {/*<Route component={NotFound}/>*/}
            </div>

          </Security>
        </Switch>
      
    </Router>
  );
}

export default App;
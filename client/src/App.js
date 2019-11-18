import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import config from './config/config';
import TestUser from './views/TestUser/TestUser';

import Home from './views/Home/Home';
import Logo from "./components/logo.component";
import Demo1Home from "./components/Demo1Login/demo1home.component";
import Caremanager from './views/CareManager/Caremanager';
import CaregiverPage from "./views/Caregiver/Caregiver";

import Navbar from "./components/TestingComponents/navbar.component"
import PatientTest from "./components/TestingComponents/PatientTest"
import CreatePatient from "./views/CareManager/create-patient.component"
import EditPatient from "./views/CareManager/edit-patient.component"
import CreateADL from "./components/CreateADL/create-ADL-list.component"


const App = () => {
	// Can use this switch statement to have a "single page app" that shows different things based on the url
  return (
    <Router>
        <Logo />
        <Navbar/>
        <br/>
        <div className="container"> {/*For testing purposes only*/}
        <Switch>
          <Security {...config.oidc}>
            <Route exact path="/" component={Home}/>
            <Route path='/implicit/callback' component={ImplicitCallback}/>
            {/* <Route exact path="/" component={Home}>
              <Redirect to="/Demo1Home"></Redirect>
            </Route> */}
            <Route exact path="/user" component={TestUser} />
            <Route exact path="/Demo1Home" component={Demo1Home} />
            <Route exact path="/CareManager" component={Caremanager} />
            <Route exact path="/Caregiver" component={CaregiverPage} />


            <Route exact path="/PatientTestPage" component={PatientTest} />
            <Route exact path="/create_patient" component={CreatePatient} />
            <Route exact path="/edit_patient" component={EditPatient} />
            <Route exact path="/create_ADL" component={CreateADL} />

          </Security>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
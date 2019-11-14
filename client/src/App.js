import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';

import NotFound from "./views/NotFound"

import Logo from "./components/logo.component"
import Demo1Home from "./components/Demo1Login/demo1home.component"
import Caremanager from './views/Caremanager';

import Navbar from "./components/TestingComponents/navbar.component"
import PatientTest from "./components/TestingComponents/PatientTest"
import CreatePatient from "./components/TestingComponents/create-patient.component"
import EditPatient from "./components/TestingComponents/edit-patient.component"
import CreateADL from "./components/CreateADL/create-ADL-list.component"


import Header from "./components/Header/Header"
import CaregiverPage from "./views/Caregiver/Caregiver"
import "bootstrap/dist/css/bootstrap.min.css"



const App = () => {
	// Can use this switch statement to have a "single page app" that shows different things based on the url
  return (
    <Router>
      <div className="container">
        <Logo />
        <Navbar /><br/> {/*For testing purposes only*/}
        <Switch>
          <Route exact path="/">
            <Redirect to="/Demo1Home"></Redirect>
          </Route>
          <Route exact path="/Demo1Home" component={Demo1Home} />
          <Route exact path="/CareManager" component={Caremanager} /> {/* MILENA'S PAGE, insert component={*your component*} */}
          <Route exact path="/Caregiver" component={CaregiverPage} />{/* LESLEY'S PAGE, insert component={*your component*} */}


          <Route exact path="/PatientTestPage" component={PatientTest} />
          <Route exact path="/create_patient" component={CreatePatient} />
          <Route exact path="/edit_patient" component={EditPatient} />
          <Route exact path="/create_ADL" component={CreateADL} />

          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
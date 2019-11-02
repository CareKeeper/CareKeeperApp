import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect  } from 'react-router-dom';

import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"

import Navbar from "./components/navbar.component"
import PatientTest from "./components/PatientTest"
import CreatePatient from "./components/create-patient.component"
import EditPatient from "./components/edit-patient.component"
import CreateADL from "./components/create-ADL-list.component"


const App = () => {
	// Can use this switch statement to have a "single page app" that shows different things based on the url
  return (
    <Router>
      <div className="container">
        <Navbar /><br/>
        <Switch>
          <Route exact path="/PatientTestPage" component={PatientTest} />
          <Route exact path="/create_patient" component={CreatePatient} />
          <Route exact path="/edit_patient" component={EditPatient} />
          <Route exact path="/create_ADL" component={CreateADL} />


          <Route exact path="/">
            <Header />
            {/*<Redirect to="/Home" />*/}
          </Route>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
// import Signup from "./Signup";
// import { Container } from "react-bootstrap"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Dashboard from "./Dashboard"
// import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Place from "./firebaseDisplayComponent/Place";
import "./App.css";
import New from "./New";
// import DataProvider from './firebaseDisplayComponent/DataProvider'
import List from "../components/List";
import { Home } from "./Home";
import Landing from "./Landing";
import Welcome from "./Welcome";
import Started from "./Started";
import LoginCom from "./LoginCom"

import 'bulma/bulma.sass';

function App() {

  return (
    <div className="main-main-main">
      <div className="mian">

        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Started} />
            <PrivateRoute path="/dashboard/:city/:trip/:lat/:lng" component={New} />
            <PrivateRoute path="/mydashboard/:country/:city/:trip/:lat/:lng/:start/:end" component={Home} />
            <PrivateRoute path="/select/:country/:city/:trip/:lat/:lng/:start/:end" component={Home} />
            <PrivateRoute path="/profile" component={UpdateProfile} />{" "}
            <Route exact path="/welcome" component={Welcome} />
            {/* <Route exact path="/signup" component={Signup} /> */}
            <Route exact path="/signup" component={Landing} />
            <Route path="/login" component={LoginCom} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/place/:id/:lat/:lng/:address" component={Place} />
            <Route path="/list" component={List} />
          </Switch>
        </Router>

      </div>
    </div>
  );
}

export default App;

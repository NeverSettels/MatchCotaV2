import React from 'react';
import '../../App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from '../home/Landing';
import Main from '../profile/Main';
import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import NavBar from '../nav/Navbar';



function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/profile">
          <Main />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

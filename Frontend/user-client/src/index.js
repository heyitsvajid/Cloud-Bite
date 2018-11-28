import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LogIn from './Components/LogIn';
import SignUp from './Components/Signup';


ReactDOM.render(
    <Router>
      <div>

        <Route exact path="/" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
      </div>
    </Router>,
  document.getElementById('root')
);


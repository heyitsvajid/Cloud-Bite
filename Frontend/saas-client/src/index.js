import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-responsive.min.css'
import LogIn from './Components/LogIn';
import AdminDashboard from './Components/AdminDashboard';


ReactDOM.render(
    <Router>
      <div>
        <Route exact path="/adminDashboard" component={AdminDashboard} />
        <Route exact path="/" component={LogIn} />
      </div>
    </Router>,
  document.getElementById('root')
);


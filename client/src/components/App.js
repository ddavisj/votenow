import './App.css';

import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

const App = ({ fetchUser }) => {
   useEffect(() => {
      fetchUser();
   }, []);

   return (
      <BrowserRouter>
         <Header />
         <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
         </div>
      </BrowserRouter>
   );
};

export default connect(null, actions)(App);

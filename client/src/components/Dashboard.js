import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
// import * as actions from '../actions';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// class Dashboard extends Component {
//    componentDidMount() {
//       this.props.fetchSurveys();
//    }

//    render(state) {
//       console.log(state);
//       return <div></div>;
//    }
// }

// function mapStateToProps(state) {
//    return state;
// }

// export default connect(mapStateToProps)(Dashboard);

const Dashboard = () => {
   return (
      <div>
         <SurveyList />
         <div className="fixed-action-btn">
            <Link to="/surveys/new" className="btn-floating btn-large red">
               <i className="material-icons">add</i>
            </Link>
         </div>
      </div>
   );
};

export default Dashboard;

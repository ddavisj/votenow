// import React from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
// import * as actions from '../actions';
import { connect } from 'react-redux';

class Dashboard extends Component {
   showLink() {
      if (this.props.auth) {
         if (this.props.auth.credits < 1) {
            return (
               <h4 style={{ textAlign: 'center', paddingTop: '20px' }}>
                  <p>Welcome to VoteNow!</p>
                  <span
                     style={{ textDecoration: 'underline', cursor: 'pointer' }}
                     onClick={() => {
                        document.querySelector('button').click();
                     }}
                  >
                     Buy credits
                  </span>{' '}
                  to send your first survey!
               </h4>
            );
         }
      }
      return;
   }

   showAddButton() {
      if (this.props.auth) {
         if (this.props.auth.credits) {
            return (
               <div className="fixed-action-btn">
                  <Link
                     to="/surveys/new"
                     className="btn-floating btn-large my-purple-bg"
                  >
                     <i className="material-icons">add</i>
                  </Link>
               </div>
            );
         }
      }
      return;
   }

   render() {
      return (
         <div>
            {this.showLink()}
            <SurveyList />
            {this.showAddButton()}
         </div>
      );
   }
}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(Dashboard);

// const Dashboard = () => {
//    return (
//       <div>
//          <SurveyList />
//          <div className="fixed-action-btn">
//             <Link to="/surveys/new" className="btn-floating btn-large green">
//                <i className="material-icons">add</i>
//             </Link>
//          </div>
//       </div>
//    );
// };

// export default Dashboard;

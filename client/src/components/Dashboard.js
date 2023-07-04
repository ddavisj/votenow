import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import { connect } from 'react-redux';

const Dashboard = ({ auth }) => {
   const showLink = () => {
      if (auth) {
         if (auth.credits < 1) {
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
                  to send a survey
               </h4>
            );
         }
      }
      return;
   };

   const showAddButton = () => {
      if (auth) {
         if (auth.credits) {
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
   };

   return (
      <div>
         {showLink()}
         <SurveyList />
         {showAddButton()}
      </div>
   );
};

const mapStateToProps = ({ auth }) => {
   return { auth };
};

export default connect(mapStateToProps)(Dashboard);

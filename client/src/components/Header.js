import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

const Header = ({ auth }) => {
   const renderContent = () => {
      switch (auth) {
         case null: // show nothing
            return;
         case false: // not logged in
            return (
               <li>
                  <a href="/auth/google" style={{ display: 'flex' }}>
                     <i
                        className="material-icons"
                        style={{ paddingRight: '10px' }}
                     >
                        login
                     </i>
                     <span>Login with Google</span>
                  </a>
               </li>
            );
         default: // otherwise, we're in!
            return [
               <li key="1" something="1">
                  <Payments />
               </li>,
               <li key="2" style={{ margin: '0 10px' }}>
                  ${auth.credits}
               </li>,
               <li key="3">
                  <a href="/api/logout" style={{ display: 'flex' }}>
                     <i
                        className="material-icons"
                        style={{ paddingRight: '10px' }}
                     >
                        logout
                     </i>
                     <span>Logout</span>
                  </a>
               </li>,
            ];
      }
   };

   return (
      <nav className="my-green-bg">
         <div className="nav-wrapper">
            <Link
               style={{ paddingLeft: '10px' }}
               to={auth ? '/surveys' : '/'}
               className="left brand-logo"
            >
               VoteNow
            </Link>
            <ul className="right">{renderContent()}</ul>
         </div>
      </nav>
   );
};

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(Header);

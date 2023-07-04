import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
   renderContent() {
      switch (this.props.auth) {
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
                  ${this.props.auth.credits}
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
   }

   render() {
      return (
         <nav className="my-green-bg">
            <div className="nav-wrapper">
               <Link
                  style={{ paddingLeft: '10px' }}
                  to={this.props.auth ? '/surveys' : '/'}
                  className="left brand-logo"
               >
                  VoteNow
               </Link>
               <ul className="right">{this.renderContent()}</ul>
            </div>
         </nav>
      );
   }
}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(Header);

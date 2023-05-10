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
                  <a href="/auth/google">Login with Google</a>
               </li>
            );
         default: // otherwise, we're in!
            return [
               <li key="1" something="1">
                  <Payments />
               </li>,
               <li key="3" style={{ margin: '0 10px' }}>
                  ${this.props.auth.credits}
               </li>,
               // <li key="4">
               //    {/* -- I added this!! */}
               //    <Link to="/funkify">F</Link>
               // </li>,
               <li key="2">
                  <a href="/api/logout">Logout</a>
               </li>,
            ];
      }
   }

   render() {
      return (
         <nav>
            <div className="nav-wrapper">
               <Link
                  style={{ paddingLeft: '10px' }}
                  to={this.props.auth ? '/surveys' : '/'}
                  className="left brand-logo"
               >
                  Emaily
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

import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Payments = ({ handleToken }) => {
   return (
      <StripeCheckout
         name="VoteNow"
         description="$10 for 10 email credits"
         amount={1000}
         token={token => handleToken(token)}
         stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
         <span style={{ display: 'flex' }}>
            <button
               className="btn my-purple-bg"
               style={{ height: 'fit-content' }}
            >
               <i className="material-icons">credit_card</i>
            </button>
         </span>
      </StripeCheckout>
   );
};

export default connect(null, actions)(Payments);

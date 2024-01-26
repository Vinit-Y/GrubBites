import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from '../actions/orderActions'; // import placeOrder action from 
import { emptyCart } from '../actions/cartActions'; // import emptyCart action from 

import Error from '../components/Error'; // import Error component
import Loading from '../components/Loading'; // import Loading component
import Success from '../components/Success'; // import Success component


export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer); // get order state from redux store
  const { loading, error, success } = orderstate; // extract loading, error and success from order state
  const dispatch = useDispatch(); // get dispatch function from redux store

  function tokenHandler(token) { // function to handle token
    console.log(token);
    dispatch(placeOrder(token, subtotal)) // dispatch placeOrder action with token and subtotal as parameters
      .then(() => {
        dispatch(emptyCart()); // dispatch emptyCart action after successful order placement
      })
      .catch((error) => {
        console.error('Payment failed or order placing failed:', error);
      });
  }
  

  return (
    <div>
      {loading && <Loading />}  
      {/* // if loading is true, display Loading component */}

      {error && <Error error="Something went wrong" />}  
      {/* if error is true, display Error component with "Something went wrong" message */}
      {success && <Success success="Your Order Placed Successfully" />} 
       {/* if success is true, display Success component with Your Order Placed Successfully" message */}

      <StripeCheckout
        amount={subtotal * 100} // convert subtotal to cents
        shippingAddress  // enable shipping address
        token={tokenHandler}  // pass tokenHandler function as callback function for StripeCheckout
        stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ" // Stripe public key
        currency="USD" // currency for payment
      >
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
}

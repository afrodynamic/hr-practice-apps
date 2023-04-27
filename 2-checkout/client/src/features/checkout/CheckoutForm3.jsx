import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nextStep, setBillingZip, setCreditCardNumber, setCvv, setExpiry, setForm3Completed } from './checkoutSlice.js';

const CheckoutForm3 = () => {
  const dispatch = useDispatch();
  const { creditCardNumber, expiry, cvv, billingZip } = useSelector(state => state.checkout.form3);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setForm3Completed());
    dispatch(nextStep());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Credit Card Number:
        <input type="text" value={creditCardNumber} onChange={(event) => dispatch(setCreditCardNumber(event.target.value))} />
      </label>
      <br />
      <label>
        Expiry:
        <input type="text" value={expiry} onChange={(event) => dispatch(setExpiry(event.target.value))} />
      </label>
      <br />
      <label>
        CVV:
        <input type="text" value={cvv} onChange={(event) => dispatch(setCvv(event.target.value))} />
      </label>
      <br />
      <label>
        Billing Zip:
        <input type="text" value={billingZip} onChange={(event) => dispatch(setBillingZip(event.target.value))} />
      </label>
      <br />
      <button type="submit">Checkout</button>
    </form>
  );
};

export default CheckoutForm3;

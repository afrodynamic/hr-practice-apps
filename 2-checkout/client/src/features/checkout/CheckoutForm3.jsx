import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nextStep, previousStep, saveCheckoutData, setBillingZip, setCreditCardNumber, setCvv, setExpiry, setForm3Completed } from './checkoutSlice.js';

const CheckoutForm3 = () => {
  const dispatch = useDispatch();
  const { creditCardNumber, expiryDate, cvv, billingZip } = useSelector((state) => state.checkout.form3);
  const checkoutData = useSelector((state) => state.checkout);

  const handleCreditCardNumberChange = (event) => {
    dispatch(setCreditCardNumber(event.target.value));
  };

  const handleExpiryChange = (event) => {
    dispatch(setExpiry(event.target.value));
  };

  const handleCvvChange = (event) => {
    dispatch(setCvv(event.target.value));
  };

  const handleBillingZipChange = (event) => {
    dispatch(setBillingZip(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setForm3Completed());
    dispatch(nextStep());
    dispatch(saveCheckoutData(checkoutData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Credit Card Number:
        <input type="text" value={creditCardNumber} onChange={handleCreditCardNumberChange} />
      </label>

      <br />

      <label>
        Expiry:
        <input type="text" value={expiryDate} onChange={handleExpiryChange} />
      </label>

      <br />

      <label>
        CVV:
        <input type="text" value={cvv} onChange={handleCvvChange} />
      </label>

      <br />

      <label>
        Billing Zip:
        <input type="text" value={billingZip} onChange={handleBillingZipChange} />
      </label>

      <br />

      <button onClick={() => dispatch(previousStep())}>Previous</button>

      <button type="submit">Checkout</button>
    </form>
  );
};

export default CheckoutForm3;

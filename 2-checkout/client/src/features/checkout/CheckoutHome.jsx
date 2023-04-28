import React from 'react';

import { useDispatch } from 'react-redux';

import { nextStep } from './checkoutSlice';

const CheckoutHome = () => {
  const dispatch = useDispatch();

  const handleStartCheckout = () => {
    dispatch(nextStep());
  };

  return (
    <div>
      <h1>Checkout</h1>

      <button onClick={handleStartCheckout}>Start</button>
    </div>
  );
};

export default CheckoutHome;

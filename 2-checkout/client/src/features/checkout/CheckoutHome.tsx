import React, { FC } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { nextStep } from './checkoutSlice';

const CheckoutHome: FC = () => {
  const dispatch = useAppDispatch();

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

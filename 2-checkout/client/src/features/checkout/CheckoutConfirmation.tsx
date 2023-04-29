import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextStep, previousStep, reset, saveCheckoutData, setCompleted } from './checkoutSlice';

const CheckoutConfirmation: FC = () => {
  const dispatch = useAppDispatch();
  const { form1, form2, form3 } = useAppSelector((state) => state.checkout);
  const checkoutData = useAppSelector((state) => state.checkout);

  const handleCompletePurchase = () => {
    dispatch(setCompleted());
    dispatch(nextStep());
    dispatch(saveCheckoutData());
    alert('Purchase Complete!');
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div>
      <h2>Confirmation</h2>
      <h3>Order Summary</h3>

      <h4>Account Details</h4>
      <p>Name: {form1.name}</p>
      <p>Email: {form1.email}</p>

      <br></br>

      <h4>Shipping Details</h4>
      <p>Shipping Address:</p>
      <p>{form2.line1}</p>
      {form2.line2 && <p>{form2.line2}</p>}
      <p>
        {form2.city}, {form2.state} {form2.zip}
      </p>
      <p>Phone Number: {form2.phoneNumber}</p>

      <br></br>

      <h4>Payment Details</h4>
      <p>Credit Card Number: {form3.creditCardNumber}</p>
      <p>Expiry Date: {form3.expiryDate}</p>
      <p>CVV: {form3.cvv}</p>
      <p>Billing Zip: {form3.billingZip}</p>

      <br></br>

      <button onClick={() => dispatch(previousStep())}>Previous</button>

      <button onClick={handleReset}>Reset</button>

      <button onClick={handleCompletePurchase}>Complete Purchase</button>

      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default CheckoutConfirmation;

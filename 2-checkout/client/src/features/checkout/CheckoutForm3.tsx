import React, { ChangeEvent, FC, FormEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextStep, previousStep, saveCheckoutData, setBillingZip, setCreditCardNumber, setCvv, setExpiry, setForm3Completed } from './checkoutSlice';

const CheckoutForm3: FC = () => {
  const dispatch = useAppDispatch();
  const { creditCardNumber, expiryDate, cvv, billingZip } = useAppSelector((state) => state.checkout.form3);
  const checkoutData = useAppSelector((state) => state.checkout);

  const handleCreditCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreditCardNumber(event.target.value));
  };

  const handleExpiryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setExpiry(event.target.value));
  };

  const handleCvvChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCvv(event.target.value));
  };

  const handleBillingZipChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBillingZip(event.target.value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setForm3Completed());
    dispatch(nextStep());
    dispatch(saveCheckoutData());
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

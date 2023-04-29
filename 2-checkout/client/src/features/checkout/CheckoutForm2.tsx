import React, { ChangeEvent, FC, FormEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextStep, previousStep, saveCheckoutData, setCity, setForm2Completed, setLine1, setLine2, setPhoneNumber, setState, setZip } from './checkoutSlice';

const CheckoutForm2: FC = () => {
  const dispatch = useAppDispatch();
  const { line1, line2, city, state, zip, phoneNumber } = useAppSelector((state) => state.checkout.form2);
  const checkoutData = useAppSelector((state) => state.checkout);

  const handleLine1Change = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLine1(event.target.value));
  };

  const handleLine2Change = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLine2(event.target.value));
  };

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCity(event.target.value));
  };

  const handleStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setState(event.target.value));
  };

  const handleZipChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setZip(event.target.value));
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhoneNumber(event.target.value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setForm2Completed());
    dispatch(nextStep());
    dispatch(saveCheckoutData());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address Line 1:
        <input type="text" value={line1} onChange={handleLine1Change} />
      </label>

      <br />

      <label>
        Address Line 2:
        <input type="text" value={line2} onChange={handleLine2Change} />
      </label>

      <br />

      <label>
        City:
        <input type="text" value={city} onChange={handleCityChange} />
      </label>

      <br />

      <label>
        State:
        <input type="text" value={state} onChange={handleStateChange} />
      </label>

      <br />

      <label>
        Zip Code:
        <input type="text" value={zip} onChange={handleZipChange} />
      </label>

      <br />

      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
      </label>

      <br />

      <button onClick={() => dispatch(previousStep())}>Previous</button>

      <button type="submit">Next</button>
    </form>
  );
};

export default CheckoutForm2;

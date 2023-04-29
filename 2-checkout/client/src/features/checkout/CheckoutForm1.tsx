import React, { ChangeEvent, FC, FormEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextStep, reset, saveCheckoutData, setEmail, setForm1Completed, setName, setPassword } from './checkoutSlice';

const CheckoutForm1: FC = () => {
  const dispatch = useAppDispatch();
  const { name, email, password } = useAppSelector((state) => state.checkout.form1);
  const checkoutData = useAppSelector((state) => state.checkout);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setForm1Completed());
    dispatch(nextStep());
    dispatch(saveCheckoutData());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>

      <br />

      <label>
        Email:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>

      <br />

      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>

      <br />

      <button onClick={handleReset}>Start Over</button>

      <button type="submit">Next</button>
    </form>
  );
};

export default CheckoutForm1;

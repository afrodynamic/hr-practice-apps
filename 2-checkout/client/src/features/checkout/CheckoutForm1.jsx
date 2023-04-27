import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nextStep, setEmail, setForm1Completed, setName, setPassword } from './checkoutSlice.js';

const CheckoutForm1 = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.checkout.form1.name);
  const email = useSelector((state) => state.checkout.form1.email);
  const password = useSelector((state) => state.checkout.form1.password);

  const handleNameChange = (event) => {
    dispatch(setName(event.target.value));
  };

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    dispatch(setPassword(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setForm1Completed());
    dispatch(nextStep());
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

      <button type="submit">Next</button>
    </form>
  );
};

export default CheckoutForm1;

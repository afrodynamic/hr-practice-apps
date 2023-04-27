import React from 'react';
import { useSelector } from 'react-redux';

import CheckoutComplete from './CheckoutComplete.jsx';
import CheckoutConfirmation from './CheckoutConfirmation.jsx';
import CheckoutForm1 from './CheckoutForm1.jsx';
import CheckoutForm2 from './CheckoutForm2.jsx';
import CheckoutForm3 from './CheckoutForm3.jsx';

const Checkout = () => {
  const step = useSelector((state) => state.checkout.step);

  return (
    <div>
      {step === 1 && <CheckoutForm1 />}
      {step === 2 && <CheckoutForm2 />}
      {step === 3 && <CheckoutForm3 />}
      {step === 4 && <CheckoutConfirmation />}
      {step === 5 && <CheckoutComplete />}
    </div>
  );
};

export default Checkout;

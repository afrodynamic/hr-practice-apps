import React, { FC } from 'react';

import { useAppSelector } from '../../app/hooks';
import CheckoutComplete from './CheckoutComplete';
import CheckoutConfirmation from './CheckoutConfirmation';
import CheckoutForm1 from './CheckoutForm1';
import CheckoutForm2 from './CheckoutForm2';
import CheckoutForm3 from './CheckoutForm3';
import CheckoutHome from './CheckoutHome';

const Checkout: FC = () => {
  const step = useAppSelector((state) => state.checkout.step);

  return (
    <div>
      {step === 0 && <CheckoutHome />}
      {step === 1 && <CheckoutForm1 />}
      {step === 2 && <CheckoutForm2 />}
      {step === 3 && <CheckoutForm3 />}
      {step === 4 && <CheckoutConfirmation />}
      {step === 5 && <CheckoutComplete />}
    </div>
  );
};

export default Checkout;

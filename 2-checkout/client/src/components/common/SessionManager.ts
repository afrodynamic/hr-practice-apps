import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCheckoutData } from '../../features/checkout/checkoutSlice';

const SessionManager = () => {
  const checkoutData = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    const data = localStorage.getItem('sessionCheckoutData');

    if (data) {
      dispatch(setCheckoutData(JSON.parse(data)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sessionCheckoutData', JSON.stringify(checkoutData));
  }, [checkoutData]);

  return null;
};

export default SessionManager;

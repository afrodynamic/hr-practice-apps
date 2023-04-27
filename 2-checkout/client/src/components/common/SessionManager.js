import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCheckoutData } from '../../features/checkout/checkoutSlice';

const SessionManager = () => {
  const { checkoutData } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('sessionCheckoutData'));

    if (data) {
      dispatch(setCheckoutData(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sessionCheckoutData', JSON.stringify(checkoutData));
  }, [checkoutData]);

  return null;
};

export default SessionManager;

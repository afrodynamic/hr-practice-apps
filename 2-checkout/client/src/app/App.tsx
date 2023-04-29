import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Checkout from '../features/checkout/Checkout';
import CheckoutConfirmation from '../features/checkout/CheckoutConfirmation';
import CheckoutForm1 from '../features/checkout/CheckoutForm1';
import CheckoutForm2 from '../features/checkout/CheckoutForm2';
import CheckoutForm3 from '../features/checkout/CheckoutForm3';

import store from './store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Checkout />} />
          <Route path="/form1" element={<CheckoutForm1 />} />
          <Route path="/form2" element={<CheckoutForm2 />} />
          <Route path="/form3" element={<CheckoutForm3 />} />
          <Route path="/confirmation" element={<CheckoutConfirmation />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

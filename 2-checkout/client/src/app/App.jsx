import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Checkout from '../features/checkout/Checkout.jsx';
import CheckoutConfirmation from '../features/checkout/CheckoutConfirmation.jsx';
import CheckoutForm1 from '../features/checkout/CheckoutForm1.jsx';
import CheckoutForm2 from '../features/checkout/CheckoutForm2.jsx';
import CheckoutForm3 from '../features/checkout/CheckoutForm3.jsx';

import store from './store';

function App() {
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
}

export default App;

import { configureStore } from '@reduxjs/toolkit';

import checkoutReducer from '../features/checkout/checkoutSlice.js';

const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
  },
});

export default store;

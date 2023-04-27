import { configureStore } from '@reduxjs/toolkit';

import checkoutReducer from '../features/checkout/checkoutSlice.js';

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('sessionCheckoutData', serializedState);
  } catch (error) {
    console.log(error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('sessionCheckoutData');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;

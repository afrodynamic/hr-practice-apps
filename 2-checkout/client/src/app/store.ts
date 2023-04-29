import { Action, AnyAction, configureStore, Store, ThunkDispatch, ThunkMiddleware } from '@reduxjs/toolkit';
import thunk, { ThunkAction as BaseThunkAction } from 'redux-thunk';
import checkoutReducer, { CheckoutState } from '../features/checkout/checkoutSlice';

const saveToLocalStorage = (state: CheckoutState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('sessionCheckoutData', serializedState);
  } catch (error) {
    console.log(error);
  }
};

const loadFromLocalStorage = (): CheckoutState | undefined => {
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

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = BaseThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const thunkMiddleware: ThunkMiddleware<RootState, AnyAction> = thunk;

const store: Store<{ checkout: CheckoutState }, AnyAction> = configureStore({
  reducer: {
    checkout: checkoutReducer,
  },
  preloadedState: {
    checkout: persistedState,
  },
  middleware: [thunkMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage(state.checkout);
});

export default store;

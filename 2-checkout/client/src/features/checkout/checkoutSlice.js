import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const saveCheckoutData = createAsyncThunk(
  'session/saveCheckoutData',
  async(_, { getState }) => {
    const { checkout } = getState();
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkout),
    });
    const data = await response.json();
    return data;
  }
);

const checkoutInitialState =
{
  step: 0,
  form1: {
    name: '',
    email: '',
    password: '',
    completed: false,
  },
  form2: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
    completed: false,
  },
  form3: {
    creditCardNumber: '',
    expiryDate: '',
    cvv: '',
    billingZip: '',
    completed: false,
  },
  completed: false,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: checkoutInitialState,
  reducers: {
    setName: (state, action) => {
      state.form1.name = action.payload;
    },
    setEmail: (state, action) => {
      state.form1.email = action.payload;
    },
    setPassword: (state, action) => {
      state.form1.password = action.payload;
    },
    setForm1Completed: (state) => {
      state.form1.completed = true;
    },
    setLine1: (state, action) => {
      state.form2.line1 = action.payload;
    },
    setLine2: (state, action) => {
      state.form2.line2 = action.payload;
    },
    setCity: (state, action) => {
      state.form2.city = action.payload;
    },
    setState: (state, action) => {
      state.form2.state = action.payload;
    },
    setZip: (state, action) => {
      state.form2.zip = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.form2.phoneNumber = action.payload;
    },
    setForm2Completed: (state) => {
      state.form2.completed = true;
    },
    setCreditCardNumber: (state, action) => {
      state.form3.creditCardNumber = action.payload;
    },
    setExpiry: (state, action) => {
      state.form3.expiryDate = action.payload;
    },
    setCvv: (state, action) => {
      state.form3.cvv = action.payload;
    },
    setBillingZip: (state, action) => {
      state.form3.billingZip = action.payload;
    },
    setForm3Completed: (state) => {
      state.form3.completed = true;
    },
    setCompleted: (state) => {
      state.completed = true;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    previousStep: (state) => {
      state.step -= 1;
    },
    setCheckoutData: (state, action) => {
      return action.payload;
    },
    reset: (state) => {
      state.step = checkoutInitialState.step;
      state.form1 = checkoutInitialState.form1;
      state.form2 = checkoutInitialState.form2;
      state.form3 = checkoutInitialState.form3;
      state.completed = checkoutInitialState.completed;
    }
  }
});

export const { setName, setEmail, setPassword, setForm1Completed, setLine1, setLine2, setCity, setState, setZip, setPhoneNumber, setForm2Completed, setCreditCardNumber, setExpiry, setCvv, setBillingZip, setForm3Completed, setCompleted, nextStep, previousStep, reset } = checkoutSlice.actions;

export default checkoutSlice.reducer;

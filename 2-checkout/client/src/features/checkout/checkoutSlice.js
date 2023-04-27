import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    step: 1,
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
  },
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
      state.form3.expiry = action.payload;
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
    prevStep: (state) => {
      state.step -= 1;
    },
    reset: (state) => {
      state.step = 1;
      state.form1 = {
        name: '',
        email: '',
        password: '',
        completed: false,
      };
      state.form2 = {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
        completed: false,
      };
      state.form3 = {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        billingZip: '',
        completed: false,
      };
      state.completed = false;
    }
  },
});

export const { setName, setEmail, setPassword, setForm1Completed, setLine1, setLine2, setCity, setState, setZip, setPhoneNumber, setForm2Completed, setCreditCardNumber, setExpiry, setCvv, setBillingZip, setForm3Completed, setCompleted, nextStep, prevStep, reset } = checkoutSlice.actions;

export default checkoutSlice.reducer;

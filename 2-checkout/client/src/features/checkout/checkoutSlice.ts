import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const saveCheckoutData = createAsyncThunk(
  'session/saveCheckoutData',
  async(_, { getState }) => {
    const { checkout } = getState() as RootState;
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

interface Form1 {
  name: string;
  email: string;
  password: string;
  completed: boolean;
}

interface Form2 {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  completed: boolean;
}

interface Form3 {
  creditCardNumber: string;
  expiryDate: string;
  cvv: string;
  billingZip: string;
  completed: boolean;
}

interface CheckoutState {
  step: number;
  form1: Form1;
  form2: Form2;
  form3: Form3;
  completed: boolean;
}

const checkoutInitialState: CheckoutState =
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
    setName: (state, action: PayloadAction<string>) => {
      state.form1.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.form1.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.form1.password = action.payload;
    },
    setForm1Completed: (state) => {
      state.form1.completed = true;
    },
    setLine1: (state, action: PayloadAction<string>) => {
      state.form2.line1 = action.payload;
    },
    setLine2: (state, action: PayloadAction<string>) => {
      state.form2.line2 = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.form2.city = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.form2.state = action.payload;
    },
    setZip: (state, action: PayloadAction<string>) => {
      state.form2.zip = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.form2.phoneNumber = action.payload;
    },
    setForm2Completed: (state) => {
      state.form2.completed = true;
    },
    setCreditCardNumber: (state, action: PayloadAction<string>) => {
      state.form3.creditCardNumber = action.payload;
    },
    setExpiry: (state, action: PayloadAction<string>) => {
      state.form3.expiryDate = action.payload;
    },
    setCvv: (state, action: PayloadAction<string>) => {
      state.form3.cvv = action.payload;
    },
    setBillingZip: (state, action: PayloadAction<string>) => {
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
    setCheckoutData: (state, action: PayloadAction<CheckoutState>) => {
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

export const { setName, setEmail, setPassword, setForm1Completed, setLine1, setLine2, setCity, setState, setZip, setPhoneNumber, setForm2Completed, setCreditCardNumber, setExpiry, setCvv, setBillingZip, setForm3Completed, setCompleted, nextStep, previousStep, setCheckoutData, reset } = checkoutSlice.actions;

export type { CheckoutState };

export default checkoutSlice.reducer;

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ACCOUNT_CURRENCY, CURRENCY_URL} from "../../globalVars.js";
import axios from "axios";

const initialState = {
  loading: false,
  currencies: null,
  sort: 'date',
  error: null,
}

const accountSlice = createSlice({
  name: 'account/userAccount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountCurrencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currencies = action.payload;
      })
      .addCase(getAccountCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const getAccountCurrencies = createAsyncThunk(
  'account/getCurrencies',
  async (_, {
    getState,
    rejectWithValue
  }) => {
    const state = getState();
    const token = state.login.token;

    try {
      const response = await axios.get(ACCOUNT_CURRENCY, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`
        }
      })
      if (response.data.error) {
        rejectWithValue(response.data.error);
      }
      return response.data.payload;
    } catch(err) {
      rejectWithValue(err);
    }
  }
)

// * selectors

export const getCurrencies = state => state.account.currencies;

export const accountReducer = accountSlice.reducer;
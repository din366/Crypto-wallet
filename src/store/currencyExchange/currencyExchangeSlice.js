import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {ACCOUNT_CURRENCY_FOR_EXCHANGE} from "../../globalVars.js";

const initialState = {
  availableCurrencies: null,
  loading: false,
  error: false,
}

const CurrencyExchangeSlice = createSlice({
  name: 'currencyExchange',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAvailableCurrencies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getAvailableCurrencies.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.availableCurrencies = action.payload;
    });
    builder.addCase(getAvailableCurrencies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export const getAvailableCurrencies = createAsyncThunk(
  'currencyExchange/getAvailableCurrencies',
  async (_, {
    rejectWithValue,
    getState
  }) => {
    const state = getState();
    const token = state.login.token;

    try {
      const response = await axios.get(ACCOUNT_CURRENCY_FOR_EXCHANGE, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`
        }
      });

      if (response.data.error) {
        rejectWithValue(response.data.error);
      }
      console.log(response.data.payload);
      return response.data.payload;
      } catch (err) {
      rejectWithValue(err);
    }
  }
)

export const availableCurrencies = state => state.currencyExchange.availableCurrencies;

export const currencyExchangeReducer =  CurrencyExchangeSlice.reducer;
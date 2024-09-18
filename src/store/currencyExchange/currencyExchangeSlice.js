import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {ACCOUNT_CURRENCY_FOR_EXCHANGE, COIN_EXCHANGE} from "../../globalVars.js";
import {getPopup} from "../popup/popupSlice.js";

const initialState = {
  availableCurrencies: null,
  loading: false,
  error: false,
  exchangeError: null,
  exchangeLoading: false,
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
    builder.addCase(makeExchange.pending, (state) => {
      state.exchangeLoading = true;
      state.exchangeError = null;
    });
    builder.addCase(makeExchange.fulfilled, (state) => {
      state.exchangeLoading = false;
      state.exchangeError = null;
    });
    builder.addCase(makeExchange.rejected, (state, action) => {
      state.exchangeError = action.payload;
      state.exchangeLoading = false;
    })
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
        return rejectWithValue(response.data.error);
      }
      return response.data.payload;
      } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const makeExchange = createAsyncThunk(
  'currencyExchange/makeExchange',
  async (data, {
    rejectWithValue,
    getState,
    dispatch
  }) => {
    const state = getState();
    const token = state.login.token;

    try {
      const response = await axios.post(COIN_EXCHANGE, {
        from: data.from,
        to: data.to,
        amount: data.amount
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`
        }
      });

      if (response.data.error) {
        dispatch(getPopup({
          text: response.data.error === 'Not enough currency' ? 'Недостаточно средств на счете' : response.data.error,
          delay: 4000,
          type: 'alert',
        }));
        return rejectWithValue(response.data.error);
      }
      dispatch(getAvailableCurrencies());
      return response.data.payload;
    } catch (err) {
      dispatch(getPopup({
        text: err,
        delay: 4000,
        type: 'alert',
      }));
      return rejectWithValue(err);
    }
  }
)

export const currencies = state => state.currencyExchange.availableCurrencies;
export const exchangeLoading = state => state.currencyExchange.exchangeLoading;

export const availableCurrencies = createSelector(
  [currencies],
  (currencies) => {
  return currencies ? Object.values(currencies).map(({code, amount}) => ({code: code, amount: +amount.toFixed(9)})) : null;
})

export const availableCurrenciesOnlyName = createSelector(
  [availableCurrencies],
  (currencies) => {
    return currencies ?
      Object.values(currencies).map(item => item.code):
      null;
  }
)

export const currencyExchangeReducer =  CurrencyExchangeSlice.reducer;
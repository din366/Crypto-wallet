import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ACCOUNT_CURRENCY} from "../../globalVars.js";
import axios from "axios";

const sortVariables = {
  openAccountDate: 'openAccountDate',
  accountNumber: 'accountNumber',
  balance: 'balance',
  lastTransactionDate: 'lastTransactionDate',
}

const initialState = {
  loading: false,
  currencies: null,
  sort: sortVariables.accountNumber,
  error: null,
}

const accountSlice = createSlice({
  name: 'account/userAccount',
  initialState,
  reducers: {
    sortCurrencies: (state, action) => {
      switch (action.payload) {
        case sortVariables.openAccountDate:
          state.currencies = state.currencies.sort((a, b) => {
           return Date.parse(a.date) - Date.parse(b.date);
          });
          break;
        case sortVariables.accountNumber:
          state.currencies = state.currencies.sort((a, b) => {
            return a.account - b.account;
          })
          break;
        case sortVariables.balance:
          state.currencies = state.currencies.sort((a, b) => {

            return a.balance - b.balance;
          })
          break;
        case sortVariables.lastTransactionDate:
          state.currencies = state.currencies.sort((a, b) => {
            console.log(a.account)
            return Date.parse(a.transactions[0].date) - Date.parse(b.transactions[0].date);
          })
          break;
      }
    }
  },
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
export const getLoading = state => state.account.loading;


export const {sortCurrencies} = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
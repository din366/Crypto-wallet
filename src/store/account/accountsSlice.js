import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {ACCOUNT_CURRENCY, CREATE_ACCOUNT} from "../../globalVars.js";
import axios from "axios";
import {getPopup} from "../popup/popupSlice.js";

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
  newAccountButtonIsActive: true,
}

const accountsSlice = createSlice({
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
            return Date.parse(a.transactions[0]?.date ?? 0) - Date.parse(b.transactions[0]?.date ?? 0);
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
      .addCase(newAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.newAccountButtonIsActive = false;
      })
      .addCase(newAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newAccountButtonIsActive = false;
      })
      .addCase(newAccount.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.newAccountButtonIsActive = true;
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
        return rejectWithValue(response.data.error);
      }
      return response.data.payload;
    } catch(err) {
      return rejectWithValue(err.message);
    }
  }
)

export const newAccount = createAsyncThunk(
  'account/newAccount',
  async (_, {
    getState,
    dispatch,
    rejectWithValue
  }) => {
    const state = getState();
    const token = state.login.token;

    try {
      const response = await axios.post(CREATE_ACCOUNT, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`
        }
      })

      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      dispatch(getAccountCurrencies());
      dispatch(getPopup({
        text: 'Новый аккаунт создан',
        delay: 4000
      }))
      return response.data.payload;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)


// * selectors

export const getCurrencies = state => state.account.currencies;

const selectCurrencies = state => state.account.currencies; // * for getAllBillsNumbers selector (memoization)
export const getAllBillsNumbers = createSelector(
  [selectCurrencies],
  (currencies) => currencies?.map(item => ({account: item.account, balance: item.balance.toFixed(2)}))
);

export const getLoading = state => state.account.loading;
export const newAccountButtonIsActive = state => state.account.newAccountButtonIsActive;


export const {sortCurrencies} = accountsSlice.actions;
export const accountReducer = accountsSlice.reducer;
import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getAccountIdData} from "../../globalVars.js";
import {groupBillsByMonth} from "../../features/groupBillsByMonth/groupBillsByMonth.js";

const initialState = {
  loading: false,
  error: null,
  accountInfo: null,
}

export const singleAccountSlice = createSlice({
  name: "singleAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleAccountData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.accountInfo = null;
      })
      .addCase(getSingleAccountData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleAccountData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.accountInfo = action.payload;
      })
  }
});

// * Thunk

export const  getSingleAccountData = createAsyncThunk(
  'account/getSingleAccountData',
  async (id, {
    rejectWithValue,
    getState
  }) => {
    const state = getState();
    const token = state.login.token;

    try {
      const response = await axios.get(getAccountIdData(id), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${token}`
        }
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data.payload;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)

// * Selectors

export const getData = state => state.singleAccount.accountInfo;

const selectAccountInfo = state => state.singleAccount.accountInfo; // * for getTransactionsHistory and getLastSixMonthTransactions
export const getLastSixMonthTransactions = createSelector(
  [selectAccountInfo],
  (accountInfo) => {
    if (!accountInfo || accountInfo.transactions.length === 0) {
      return false;
    }

    return groupBillsByMonth(accountInfo.transactions, accountInfo.account, 6); // ? grouping by month with sum at the end of the month
  }
);

export const getTransactionsHistory = createSelector(
  [selectAccountInfo],
  (accountInfo) => {
    if (!accountInfo || accountInfo.transactions.length === 0) {
      return false;
    }

    const transactions = accountInfo.transactions;
    return [...transactions].sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    }).slice(0, 100);
  }
);

export const singleAccountReducer = singleAccountSlice.reducer;
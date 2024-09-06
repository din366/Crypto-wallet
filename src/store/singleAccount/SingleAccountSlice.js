import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
      })
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
export const getLastSixMonthTransactions = (state) => {
  if (!state.singleAccount.accountInfo || state.singleAccount.accountInfo.transactions.length === 0) {
    return false;
  }

  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  if (currentDate.getMonth() < 6) {
    sixMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
  }

  const transactions = state.singleAccount.accountInfo.transactions.filter(item => {
    const date = new Date(item.date);
    return date >= sixMonthsAgo;
  }).sort((a, b) => {
    return Date.parse(a.date) - Date.parse(b.date);
  });
  return groupBillsByMonth(transactions);
}

export const getTransactionsHistory = state => {
  if (!state.singleAccount.accountInfo || state.singleAccount.accountInfo.transactions.length === 0) {
    return false;
  }

  const transactions = state.singleAccount.accountInfo.transactions;
  return [...transactions].sort((a, b) => { // * new array, not mutable
    return Date.parse(b.date) - Date.parse(a.date); // * from largest to smallest
  }).slice(0, 100);
}

export const singleAccountReducer = singleAccountSlice.reducer;
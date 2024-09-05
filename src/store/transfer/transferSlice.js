import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TRANSFER_FUNDS} from "../../globalVars.js";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  requestData: null,
}

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setTransferRequest.pending, (state) => {
        state.loading = true;
        state.requestData = null;
      })
      .addCase(setTransferRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.requestData = null;
      })
      .addCase(setTransferRequest.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.requestData = action.payload;
      })
  }
});

export const setTransferRequest = createAsyncThunk(
  'transferRequest',
  async ({bill, amount}, {getState, rejectWithValue}) => {
    const state = getState();
    const token = state.login.token;
    const currentAccount = state.singleAccount.accountInfo.account;
    console.log(currentAccount)
    const correctAmount = amount.replace(',', '.');
    try {
      const response = await axios.post(
        TRANSFER_FUNDS,
        {
          from: currentAccount,
          to: bill,
          amount: correctAmount
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${token}`
          }
        });
      console.log(response);

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

export const getTransferLoading = state => state.loading;

export const transferReducer = transferSlice.reducer;
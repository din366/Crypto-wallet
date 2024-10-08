import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TRANSFER_FUNDS} from "../../globalVars.js";
import axios from "axios";
import {getPopup} from "../popup/popupSlice.js";
import {getSingleAccountData} from "../singleAccount/SingleAccountSlice.js";
import {getAccountCurrencies} from "../account/accountsSlice.js";

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
  async ({bill, amount}, {getState, rejectWithValue, dispatch}) => {
    const state = getState();
    const token = state.login.token;
    const currentAccount = state.singleAccount.accountInfo.account;
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

      if (response.data.error) {
        dispatch(getPopup({
          text: response.data.error === 'Overdraft prevented' ? 'Сумма перевода превышает сумму на счете' : response.data.error,
          delay: 4000,
          type: 'alert'
        }))
        return rejectWithValue(response.data.error);
      }
      dispatch(getPopup({
        text: 'Операция выполнена успешно',
        delay: 4000
      }))
      dispatch(getSingleAccountData(currentAccount));
      dispatch(getAccountCurrencies());
      return response.data.payload;
    } catch (err) {
      dispatch(getPopup({
        text: err.message,
        delay: 4000
      }))
      return rejectWithValue(err.message);
    }

  }
)

// * Selectors

export const getTransferLoading = state => state.transfer.loading;

export const transferReducer = transferSlice.reducer;
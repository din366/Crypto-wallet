import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {getAccountIdData} from "../../globalVars.js";


const initialState = {
  loading: false,
  error: null,
  accountInfo: null,
}

export const singleAccountSlice = createSlice({
  name: "singleAccount",
  initialState,
  reducers: {

  },
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

export const getSingleAccountData = createAsyncThunk(
  'account/getSingleAccountData',
  async (id,{
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
        rejectWithValue(response.data.error);
      }
      return response.data.payload;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
)

export const getData = state => state.singleAccount.accountInfo;

export const singleAccountReducer = singleAccountSlice.reducer;
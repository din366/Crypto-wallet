import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {LOGIN_URL} from "../../globalVars.js";

const initialState = {
  token: null,
  loading: false,
  error: null,
}

const loginSlice = createSlice({
  name: "login/login",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = '';
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(sendLoginRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload?.token;
      })
  } 
});

// * thunk

export const sendLoginRequest = createAsyncThunk(
  'login/send-requet',
  ({login, password}, { rejectWithValue }) => {
    return axios.post(LOGIN_URL, {
      login, password
    }).then(response => {
      if(response.data.error) {
        return rejectWithValue(response.data.error);
      }
      localStorage.setItem('token', response.data.payload.token); // ? set token to localStorage
      return response.data.payload
    }).catch(error => rejectWithValue(error.message));
  }
)

export const logout = createAsyncThunk('login/logout', (payload, { dispatch }) => {
  dispatch(clearToken());
  localStorage.removeItem('token');
})

// * selectors

export const getLoading = (state) => state.login.loading;
export const getErrorData = (state) => state.login.error;
export const getToken = (state) => state.login.token;

export const {
  clearToken,
  setToken
} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
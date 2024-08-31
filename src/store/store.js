import { configureStore } from '@reduxjs/toolkit';
import {loginReducer} from "./login/loginSlice.js";
import {accountReducer} from "./account/account-slice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    account: accountReducer,
  },
});

export default store;
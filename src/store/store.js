import { configureStore } from '@reduxjs/toolkit';
import {loginReducer} from "./login/loginSlice.js";
import {accountReducer} from "./account/accountsSlice.js";
import {singleAccountReducer} from "./singleAccount/SingleAccountSlice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    account: accountReducer,
    singleAccount: singleAccountReducer,
  },
});

export default store;
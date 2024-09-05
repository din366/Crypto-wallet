import { configureStore } from '@reduxjs/toolkit';
import {loginReducer} from "./login/loginSlice.js";
import {accountReducer} from "./account/accountsSlice.js";
import {singleAccountReducer} from "./singleAccount/SingleAccountSlice.js";
import {transferReducer} from "./transfer/transferSlice.js";



const store = configureStore({
  reducer: {
    login: loginReducer,
    account: accountReducer,
    singleAccount: singleAccountReducer,
    transfer: transferReducer,
  },
  /*middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),*/
});

export default store;


/*
const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};
*/
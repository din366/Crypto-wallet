import { configureStore } from '@reduxjs/toolkit';
import {loginReducer} from "./login/loginSlice.js";
import {accountReducer} from "./account/accountsSlice.js";
import {singleAccountReducer} from "./singleAccount/SingleAccountSlice.js";
import {transferReducer} from "./transfer/transferSlice.js";
import {popupReducer} from "./popup/popupSlice.js";
import {changeCourseWebsocketReducer} from "./changeCourseWebsocket/changeCourseWebsocketSlice.js";



const store = configureStore({
  reducer: {
    login: loginReducer,
    account: accountReducer,
    singleAccount: singleAccountReducer,
    transfer: transferReducer,
    popup: popupReducer,
    changeCourse: changeCourseWebsocketReducer,
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
import { configureStore } from '@reduxjs/toolkit';
import {loginReducer} from "./login/loginSlice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
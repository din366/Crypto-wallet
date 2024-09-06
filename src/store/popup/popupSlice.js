import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  text: '',
  isShow: false,
  delay: 1000,
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.text = action.payload.text;
      state.isShow = true;
      state.delay = action.payload.delay;
    },
    hidePopup: (state) => {
      state.text = '';
      state.isShow = false;
      state.delay = 1000;
    }
  }
});

export const getPopup = createAsyncThunk(
  'getPopup',
  ({text, delay}, {
    dispatch
  }) => {
    dispatch(showPopup({text, delay}));
    setTimeout(() => {
      dispatch(hidePopup());
    }, delay);
  }
)

export const popupText = state => state.popup.text;
export const popupIsShow = state => state.popup.isShow;

export const {
  showPopup,
  hidePopup
} = popupSlice.actions;
export const popupReducer = popupSlice.reducer;
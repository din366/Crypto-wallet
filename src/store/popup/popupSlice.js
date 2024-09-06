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
      state.isShow = false;
      state.delay = 1000;
    },
    clearInfoText: (state) => {
      state.text = '';
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
    setTimeout(() => {
      dispatch(clearInfoText())
    }, delay + 500)
  }
)

export const popupText = state => state.popup.text;
export const popupIsShow = state => state.popup.isShow;

export const {
  showPopup,
  hidePopup,
  clearInfoText
} = popupSlice.actions;
export const popupReducer = popupSlice.reducer;
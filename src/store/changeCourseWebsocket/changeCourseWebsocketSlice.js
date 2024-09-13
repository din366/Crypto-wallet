import {createSlice} from "@reduxjs/toolkit";
import {CURRENCY_FEED} from "../../globalVars.js";

const initialState = {
  data: [],
  error: null,
  connected: false,
}

const changeCourseWebsocketSlice = createSlice({
  name: "change-course-websocket",
  initialState,
  reducers: {
    wsConnected: (state) => {
      state.connected = true;
    },
    wsMessageReceived: (state, action) => {
      if (state.data.length >= 10) {
        state.data = [...state.data.slice(-9), action.payload];
      } else {
        state.data.push(action.payload);
      }
    },
    wsDisconnected: (state) => {
      state.connected = false;
    },
    wsError: (state, action) => {
      state.error = action.payload;
    },
    wsDataClear: (state) => {
      state.data = [];
    }
  }
});

export const connectWebSocket = () => (dispatch) => {
  const socket = new WebSocket(CURRENCY_FEED);

  socket.onopen = () => {
    dispatch(wsConnected());
  };

  socket.onmessage = (event) => {
    dispatch(wsMessageReceived(JSON.parse(event.data)));
  };

  socket.onclose = () => {
    dispatch(wsDisconnected());
    dispatch(wsDataClear());
  };

  socket.onerror = (error) => {
    dispatch(wsError(error));
  };

  return () => {
    socket.close();
  };
};


export const changedCourse = state => state.changeCourse.data;

export const {
  wsConnected,
  wsDisconnected,
  wsError,
  wsMessageReceived,
  wsDataClear
} = changeCourseWebsocketSlice.actions;

export const changeCourseWebsocketReducer = changeCourseWebsocketSlice.reducer;
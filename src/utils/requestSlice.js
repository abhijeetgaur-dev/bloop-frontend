import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name : "requests",
  initialState : { requests: [], requestCount: 0 }, 
  reducers : {
    addRequests : (state, action)=> {
      state.requests = action.payload,
      state.requestCount = action.payload.length;
    },
  },
})

export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;
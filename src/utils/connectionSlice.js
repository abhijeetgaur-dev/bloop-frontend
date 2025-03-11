import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers :{
    addConnections : (state, actions) => {
      return actions.payload;
    },
    removeConnections : () =>{
      return [];
    },
  },
});

export const {addConnections, removeConnections} = connectionSlice.actions; 

export default connectionSlice.reducer;
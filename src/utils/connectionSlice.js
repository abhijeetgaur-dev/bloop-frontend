import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers :{
    addConnections : (state, actions) => {
      return actions.payload;
    },
    removeConnections : () =>{
      return null;
    },
  },
});

export const {addConnections, removeConnections} = connectionSlice.actions; 

export default connectionSlice.reducer;
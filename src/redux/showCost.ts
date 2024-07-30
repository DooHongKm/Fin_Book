// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: boolean } = {
  value: true,
};

// slice
export const showCostSlice: Slice = createSlice({
  name: "showCost",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// export
export const { setValue } = showCostSlice.actions;
export default showCostSlice.reducer;

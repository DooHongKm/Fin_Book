// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: number } = {
  value: 0,
};

// slice
export const listIndexSlice: Slice = createSlice({
  name: "listIndex",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// export
export const { setValue } = listIndexSlice.actions;
export default listIndexSlice.reducer;

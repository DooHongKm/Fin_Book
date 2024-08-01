// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: number } = {
  value: new Date().getFullYear(),
};

// slice
export const yearSlice: Slice = createSlice({
  name: "year",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    incValue: (state) => {
      state.value = state.value + 1;
    },
    decValue: (state) => {
      state.value = state.value - 1;
    },
  },
});

// export
export const { setValue, incValue, decValue } = yearSlice.actions;
export default yearSlice.reducer;

// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: number } = {
  value: new Date().getMonth(),
};

// slice
export const monthSlice: Slice = createSlice({
  name: "month",
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
export const { setValue, incValue, decValue } = monthSlice.actions;
export default monthSlice.reducer;

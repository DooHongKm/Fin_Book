// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: number } = {
  value: new Date().getDate(),
};

// slice
export const dateSlice: Slice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    incValue: (state) => {
      state.value = state.value += 1;
    },
    decValue: (state) => {
      state.value = state.value -= 1;
    },
  },
});

// export
export const { setValue, incValue, decValue } = dateSlice.actions;
export default dateSlice.reducer;

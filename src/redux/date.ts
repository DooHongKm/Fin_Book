// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: number } = {
  value: 0,
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
      state.value++;
    },
    decValue: (state) => {
      state.value--;
    },
  },
});

// export
export const { setValue, incValue, decValue } = dateSlice.actions;
export default dateSlice.reducer;

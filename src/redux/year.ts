import { Slice, createSlice } from "@reduxjs/toolkit";

const d: Date = new Date();
const y: number = d.getFullYear();

const initialState: { value: number } = {
  value: y,
};

export const slice: Slice = createSlice({
  name: "year",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    increase: (state) => {
      state++;
    },
    decrease: (state) => {
      state--;
    },
  },
});

export const { setValue, increase, decrease } = slice.actions;
export default slice.reducer;

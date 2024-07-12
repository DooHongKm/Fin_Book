import { Slice, createSlice } from "@reduxjs/toolkit";

const d: Date = new Date();
const m: number = d.getMonth();

const initialState: { value: number } = {
  value: m,
};

export const slice: Slice = createSlice({
  name: "month",
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

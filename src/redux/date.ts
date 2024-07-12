import { Slice, createSlice } from "@reduxjs/toolkit";

const initialState: { value: number | null } = {
  value: 0,
};

export const slice: Slice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setNull: (state) => {
      state = null;
    },
    increase: (state) => {
      state++;
    },
    decrease: (state) => {
      state--;
    },
  },
});

export const { setValue, setNull, increase, decrease } = slice.actions;
export default slice.reducer;

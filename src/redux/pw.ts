import { Slice, createSlice } from "@reduxjs/toolkit";

const initialState: { value: string } = {
  value: "",
};

export const slice: Slice = createSlice({
  name: "pw",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = slice.actions;
export default slice.reducer;

// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: string } = {
  value: "",
};

// slice
export const pwSlice: Slice = createSlice({
  name: "pw",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// export
export const { setValue } = pwSlice.actions;
export default pwSlice.reducer;

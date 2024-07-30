// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: string } = {
  value: "",
};

// slice
export const idSlice: Slice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// export
export const { setValue } = idSlice.actions;
export default idSlice.reducer;

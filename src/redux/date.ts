// import
import { Slice, createSlice } from "@reduxjs/toolkit";

// init
const initialState: { value: number | null } = {
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
    setNull: (state) => {
      state.value = null;
    },
    incValue: (state) => {
      if (state.value !== null) {
        state.value++;
      }
    },
    decValue: (state) => {
      if (state.value !== null) {
        state.value--;
      }
    },
  },
});

// export
export const { setValue, setNull, incValue, decValue } = dateSlice.actions;
export default dateSlice.reducer;

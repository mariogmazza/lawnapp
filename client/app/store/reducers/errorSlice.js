import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'errorSetting',
  initialState: { message: null },
  reducers: {
    addError: (state, action) => {
      state.message = action.payload;
    },
    removeError: state => {
      state.message = null;
    },
  },
});

export const { addError, removeError } = errorSlice.actions;
export default errorSlice.reducer;

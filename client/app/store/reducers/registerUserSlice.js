import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';
import { addError, removeError } from './errorSlice';

const initialState = {
  userPreferrences: [],
  isLoading: false,
  username: '',
  isAuth: false,
};

export const fetchUserResgister = createAsyncThunk(
  'registerNew/fetchUserResgister',
  async (data, thunkAPI) => {
    try {
      const { token, ...user } = await API.call('post', 'user/register', data);
      thunkAPI.dispatch(removeError());
      localStorage.setItem('jwtToken', token);
      API.setToken(token);
      return user;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      thunkAPI.dispatch(removeError());
      if (err.response.status === 404) {
        thunkAPI.dispatch(
          addError('Something went wrong, please try again later!'),
        );
      } else {
        thunkAPI.dispatch(addError(err.response.data.message));
      }
      return thunkAPI.rejectWithValue(
        'Something went wrong, please try again later!',
      );
    }
  },
);

export const userRegisterSlice = createSlice({
  name: 'resgisternew',
  initialState,
  reducers: {
    // registerNewUser: (state, action) => {
    //   //to-do
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserResgister.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserResgister.fulfilled, (state, action) => {
        // state.userPreferrences = [userPrefs]; // to-do
        state.username = action.payload.username;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchUserResgister.rejected, (state, action) => {
        // state.userPreferrences = []; // to-do
        state.isAuth = false;
        state.username = '';
        localStorage.clear();
        API.setToken(null);
        state.isLoading = false;
      });
  },
});

// export const { logout, resetUserData } = userRegisterSlice.actions;
export default userRegisterSlice.reducer;

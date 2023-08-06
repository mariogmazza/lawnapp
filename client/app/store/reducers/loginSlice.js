import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';
import { addError, removeError } from './errorSlice';

const initialState = {
  userPreferrences: [],
  isLoading: false,
  username: '',
  isAuth: false,
};

export const fetchUserLogin = createAsyncThunk(
  'login/fetchUser',
  async (data, thunkAPI) => {
    try {
      const { token, ...user } = await API.call('post', 'auth/login', data);
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

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateUserPreferences: (state, action) => {
      //to-do
    },
    logout: (state, action) => {
      localStorage.clear();
      API.setToken(null);
      state.isAuth = false;
      state.username = '';
      // state.userPreferrences = []; // to-do
      state.isLoading = false;
    },
    resetUserData: (state, action) => {
      localStorage.clear();
      API.setToken(null);
      state.isAuth = false;
      state.username = '';
      // state.userPreferrences = []; // to-do
      state.isLoading = true; // set to true while fetching new user
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        // state.userPreferrences = [userPrefs]; // to-do
        state.username = action.payload.username;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        // state.userPreferrences = []; // to-do
        state.isAuth = false;
        state.username = '';
        localStorage.clear();
        API.setToken(null);
        state.isLoading = false;
      });
  },
});

export const { logout, resetUserData } = loginSlice.actions;
export default loginSlice.reducer;

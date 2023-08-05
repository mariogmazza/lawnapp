import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import { addError, removeError } from "./errorSlice";

const initialState = {
  userPreferrences: [],
  isLoading: false,
  currentUser: "",
  isAuth: false,
};

export const fetchUserLogin = createAsyncThunk(
  "login/fetchUser",
  async (data, thunkAPI) => {
    try {
      const { token, ...user } = await API.call("post", "auth/login", data);

      localStorage.setItem("jwtToken", token);
      API.setToken(token);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }

      if (err.response.status === 404) {
        thunkAPI.dispatch(
          addError("Something went wrong, please try again later!")
        );
      } else {
        thunkAPI.dispatch(addError(err.response.data.message));
      }
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateUserPreferences: (state, action) => {
      //to-do
    },
    logout: (state, action) => {
      localStorage.clear();
      API.setToken(null);
      state.currentUser = "";
      state.error = "";
      state.userPreferrences = [];
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.message) {
          state.userPreferrences = [];
          state.currentUser = "";
          localStorage.clear();
          API.setToken(null);
        } else {
          state.currentUser = action.payload.username;
          state.userPreferrences = [action.payload]; // to-do add to DB a user pref field
        }
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.userPreferrences = [];
        state.currentUser = "";
        localStorage.clear();
        API.setToken(null);
      });
  },
});

export const selectUserData = (state) => state.userData.data;
export const { displayCurrentUser } = loginSlice.actions;
export default loginSlice.reducer;

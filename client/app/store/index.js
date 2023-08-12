import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './reducers/errorSlice';
import loginReducer from './reducers/loginSlice';
import registerUserReducer from './reducers/registerUserSlice';

export default configureStore({
  reducer: {
    errorState: errorReducer,
    loginState: loginReducer,
    registerState: registerUserReducer,
  },
});

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './login/page';

const HomePage = () => {
  return (
    <>
      <LoginForm />
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default HomePage;

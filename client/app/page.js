import React from 'react';
import { ToastContainer } from 'react-toastify';
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

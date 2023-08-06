'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { fetchUserLogin } from '../store/reducers/loginSlice';
import { resetUserData } from '../store/reducers/loginSlice';
import { removeError } from '../store/reducers/errorSlice';
import Navbar from '../components/Navbar';

function LoginForm() {
  const isLoading = useSelector(store => store.loginState.isLoading);
  const isAuth = useSelector(store => store.loginState.isAuth);
  const errorMessage = useSelector(store => store.errorState.message);

  const dispatch = useDispatch();
  const router = useRouter();
  const customId = 'custom-id-yes';
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    watch,
    reset,
    formState,
    setError,
  } = useForm({
    criteriaMode: 'all',
    defaultValues: { username: '', password: '' },
  });

  const handleSubmitLocal = data => {
    dispatch(resetUserData());
    dispatch(fetchUserLogin(data));
  };

  useEffect(() => {
    if (isSubmitSuccessful && isAuth) {
      reset({ username: '', password: '' });
    }

    console.log('Error message hook', errorMessage);
    if (errorMessage) {
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
        toastId: customId,
      });
      dispatch(removeError());
    }
  }, [formState, reset]);

  useEffect(() => {
    console.log('isAuth', isAuth);
    if (!isLoading && isAuth) {
      router.push('./dashboard');
    }
  }, [isAuth]);

  return (
    <>
      <Navbar />
      <main>
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center sm:py-12">
          <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="font-bold text-lime-600 text-center text-2xl mb-5">
              LawnMe App
            </h1>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              <form onSubmit={handleSubmit(handleSubmitLocal)}>
                <div className="px-5 py-7">
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    E-mail
                  </label>
                  <input
                    type="text"
                    className="border text-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    {...register('username', {
                      required: 'Username is required.',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Must be a valid email.',
                      },
                      maxLength: {
                        value: 40,
                        message: 'Must not exceed 40 characters',
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({ messages }) => {
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p className="text-sm text-red-500" key={type}>
                              {message}
                            </p>
                          ))
                        : null;
                    }}
                  />
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Password
                  </label>
                  <input
                    type="password"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    {...register('password', {
                      required: 'Password is required.',
                      maxLength: {
                        value: 40,
                        message: 'Must not exceed 40 characters',
                      },
                      minLength: {
                        value: 4,
                        message: 'Minimun of 8 characters is required',
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) => {
                      // console.log('messages', messages);
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p className="text-sm text-red-500" key={type}>
                              {message}
                            </p>
                          ))
                        : null;
                    }}
                  />
                  <button
                    type="submit"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                    <span className="inline-block mr-2">Login</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">
                    MailUp
                  </button>
                  <button
                    type="button"
                    className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">
                    Google
                  </button>
                  <button
                    type="button"
                    className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">
                    Github
                  </button>
                </div>
              </div>
              <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 inline-block align-text-top">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="inline-block ml-1">Forgot Password</span>
                    </button>
                  </div>
                  <div className="text-center sm:text-right whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <FontAwesomeIcon icon={faFileSignature} />
                      <span className="inline-block ml-1">Resgister</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="inline-block ml-1">
                      Back to lawnmeapp.com
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginForm;

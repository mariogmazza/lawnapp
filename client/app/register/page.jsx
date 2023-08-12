'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import { fetchUserResgister } from '../store/reducers/registerUserSlice';
import Navbar from '../components/Navbar';

function RegisterForm() {
  const [passd1, setPassd1] = useState('');
  const [passd2, setPassd2] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);

  const isLoading = useSelector(store => store.loginState.isLoading);
  const isAuth = useSelector(store => store.loginState.isAuth);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    watch,
    reset,
    formState,
    getValues,
  } = useForm({
    criteriaMode: 'all',
    defaultValues: { username: '', password: '' },
  });

  const handleSubmitLocal = data => {
    console.log(data);
    dispatch(fetchUserResgister(data));
    if (!isLoading && isAuth) {
      router.push('./dashboard');
    }
  };

  const handleOnchage = () => {
    console.log('getting called', getValues('password'));
    // setIsValidInput(false);
  };
  // useEffect(() => {
  //   console.log('Pass1: ', passd1);
  //   if (passd1 !== passd2) {
  //     // setIsValidInput(!isValidInput);
  //   }
  // }, [passd2]);

  // useEffect(() => {
  //   console.log('ERRORS: ', errors);
  //   if (isSubmitSuccessful) {
  //     reset({ username: '', password: '' });
  //   }
  // }, [formState, reset]);

  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-[280px] mx-auto">
          <div className="flex flex-col items-center mt-[10vh]">
            <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">
              Sign Up
            </h2>
            <button className="flex items-center mb-2 justify-center transition ease-in-out delay-50 px-3 py-2.5 space-x-2 bg-white border border-slate-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-opacity-50">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              <span className="text-gray-700 font-medium">
                Continue with Facebook
              </span>
            </button>
            <span className="mb-2 text-gray-900">Or</span>
            <form onSubmit={handleSubmit(handleSubmitLocal)}>
              <input
                type="text"
                className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
                placeholder="Email"
                {...register('username', {
                  required: 'Username is required.',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
              <input
                type="password"
                className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium"
                placeholder="Password"
                {...register('password', {
                  required: 'Required',
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
              <input
                type="password"
                className={`w-full px-6 py-3 mb-2 border border-slate-400 rounded-md text-sm shadow-sm placeholder-slate-400 ${
                  isValidInput
                    ? 'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 '
                    : 'focus:outline-none focus:focus-visible:border-green-500 focus:focus-visible:ring-pink-500'
                }`}
                placeholder="Confirm password"
                {...register('password2', {
                  required: 'Required.',
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
                name="password2"
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
              <button
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-bold text-center inline-block">
                <span className="inline-block mr-2">Sign up</span>
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
            </form>
            <p className="text-center mt-3 text-[14px]">
              Already have an account?{' '}
              <a href="/" className="text-gray-600">
                Log In
              </a>
            </p>
            <p className="text-center mt-3 text-[14px]">
              By clicking continue, you agree to our{' '}
              <a href="#/terms" className="text-gray-600">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#/privacy" className="text-gray-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegisterForm;

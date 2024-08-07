import React, { useContext } from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  //console.log(currentUser);

  const handleChange = (e) => {
    setInput(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(inputs);

      if (res) {
        let error = res;
        if (error == "Invalid Email") {
          error = "Invalid email";
        } else if (error === "Incorrect password") {
          error = "Wrong combo";
        } else if (error === "Incorrect email") {
          error = "Wrong combo";
        }
        console.log(error);
        setError(error);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  }

  
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center max-h-[1200px]">
      <div className="min-w-[400px] mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 max-w-96 ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don't have an account yet?
              <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="/register">
                Sign up here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label for="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                  <div className="relative">
                    <input type="email" id="email" name="email" onChange={handleChange} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </div>
                  </div>
                  <p className={`${error === "Invalid email" ? '' : "hidden"} text-xs text-red-600 mt-2`} id="email-error">Please include a valid email address</p>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label for="password" className="block text-sm mb-2 dark:text-white">Password</label>
                    <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="../examples/html/recover-account.html">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input type="password" id="password" name="password" onChange={handleChange} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </div>
                  </div>
                  <p className={`${error === "Wrong combo" ? '' : 'hidden'} text-xs text-red-600 mt-2`} id="password-error">Incorrect email/password</p>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                  </div>
                  <div className="ms-3">
                    <label for="remember-me" className="text-sm dark:text-white">Remember me</label>
                  </div>
                </div>

                <button type="submit" onClick={handleSubmit} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
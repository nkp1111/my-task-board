"use client";

import { showAlert } from '@/lib/alert';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import { useFormState } from "react-dom";
import SubmitFormButton from '../submitFormButton';
import Link from 'next/link';

interface SingInFormParams {
  handleSignIn: (prevState: any, queryData: any) => Promise<{
    error: string;
    user?: undefined;
    token?: undefined;
  } | {
    user: any;
    error?: undefined;
    token?: string;
  }>
}

export default function SignInForm(
  { handleSignIn }: SingInFormParams
) {
  // NOTE: useFormState takes function return formAction and state
  // formAction which contain that function execution
  // state which contains its return
  const [state, formAction] = useFormState(handleSignIn, null);
  // handle sign in alert
  useEffect(() => {
    if (state) {
      const { error, user, token } = state;
      if (error) showAlert(error || "Something went wrong", "error");
      else {
        showAlert("User Signed In successfully", "success");
        if (user) localStorage.setItem("user", JSON.stringify(user));
        redirect("/");
      }
      if (!token) showAlert("Problem signing in", "warning");
    }
  }, [state])

  return (
    <form className='sm:mx-auto shadow-sm rounded-md bg-gray-900 p-5 w-auto mx-5 sm:min-w-96' action={formAction}>

      <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Hero123" required />
      </div>


      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
      </div>

      <Link href="/auth/register"
        className='text-blue-500 underline'>
        New to <span> <em>My Task Board</em></span>?
      </Link>


      <SubmitFormButton
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-6"
      >
        Sign In
      </SubmitFormButton>
    </form>
  )
}

"use client";

import { showAlert } from '@/lib/alert';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
import { useFormState } from "react-dom";

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
      if (error) {
        showAlert(error || "Something went wrong", "error");
      }
      else {
        showAlert("User created successfully", "success");
        if (user) localStorage.setItem("user", JSON.stringify(user));
        redirect("/");
      }
      if (!token) showAlert("Problem signing in");
    }
  }, [state])

  return (
    <form className=' sm:mx-auto shadow-sm rounded-md bg-gray-900 p-5 w-auto mx-5 sm:min-w-96' action={formAction}>

      <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input type="text" id="username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Hero123" required />
      </div>


      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
      </div>
      <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="password" id="confirm_password" name="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required />
      </div>

      <div className='hidden user-details'>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" name="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" id="last_name" name="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" />
          </div>
        </div>

        <div className='mb-6'>
          <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tell about yourself</label>
          <textarea id="bio" name="bio" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write about yourself here..."></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
          <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" />
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" name="remember" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
        </div>
      </div>


      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-8">Submit</button>
    </form>
  )
}

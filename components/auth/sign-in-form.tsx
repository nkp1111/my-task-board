"use client";

import { showAlert } from '@/lib/alert';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useFormState } from "react-dom";
import SubmitFormButton from '../submitFormButton';
import Link from 'next/link';
import { showInputLabel } from '@/lib/general/form';
import EyeIcon from '../svg/eye-icon';
import EyeCloseIcon from '../svg/eye-close-icon';

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

  const [showPassword, setShowPassword] = useState({ pass: false });

  return (
    <form className='sm:mx-auto shadow-sm bg-white w-64 mx-5 sm:min-w-96' action={formAction}>

      <p className='mb-6 opacity-90'>
        New to <em>My Task Board</em>?
        <Link href="/auth/register"
          className='text-secondary'> Sign Up Now
        </Link>
      </p>


      <div className="mb-6 relative">
        <input
          type="text"
          name={"username"}
          placeholder="Username"
          className="input input-bordered w-full"
          onInput={showInputLabel}
          required
        />
        <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Username</span>
      </div>


      <div className="mb-6 relative">
        <div className='absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer'
          onClick={() => setShowPassword((pre) => ({ ...pre, pass: !pre.pass }))}
        >
          {showPassword.pass ? <EyeIcon /> : <EyeCloseIcon />}
        </div>
        <input
          type={showPassword.pass ? "text" : "password"}
          name={"password"}
          placeholder="Password"
          className="input input-bordered w-full"
          onInput={showInputLabel}
          required />
        <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Password</span>
      </div>



      <SubmitFormButton
        className="text-white bg-secondary hover:bg-secondary/90 focus:outline-none font-medium rounded-full text-sm w-full px-5 py-3 text-center mt-2"
      >
        Sign In
      </SubmitFormButton>
    </form>
  )
}

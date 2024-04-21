"use client";

import { showAlert } from '@/lib/alert';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useFormState } from "react-dom";
import SubmitFormButton from '../submitFormButton';
import Link from 'next/link';
import EyeIcon from '../svg/eye-icon';
import EyeCloseIcon from '../svg/eye-close-icon';
import { showInputLabel } from '@/lib/general/form';

interface RegisterFormParams {
  handleRegister: (prevState: any, queryData: any) => Promise<{
    error: string;
    user?: undefined;
    token?: undefined;
  } | {
    user: any;
    error?: undefined;
    token?: string;
  }>
}

export default function RegisterForm(
  { handleRegister }: RegisterFormParams
) {
  // NOTE: useFormState takes function return formAction and state
  // formAction which contain that function execution
  // state which contains its return
  const [state, formAction] = useFormState(handleRegister, null);
  // handle sign in alert
  useEffect(() => {
    if (state) {
      const { error, user, token } = state;
      if (error) showAlert(error || "Something went wrong", "error");
      else {
        showAlert("User created successfully", "success");  // show success alert
        if (user) localStorage.setItem("user", JSON.stringify(user));
        redirect("/");  // redirect to home page
      }
      if (!token) showAlert("Problem signing in", "warning");
    }
  }, [state]);


  const [showPassword, setShowPassword] = useState({ pass: false, pass2: false });

  return (
    <form className='mx-auto shadow-sm bg-white sm:min-w-96 w-64 rounded-md' action={formAction}>

      <p className='mb-6 opacity-90'>
        Already a member?
        <Link href="/auth/sign-in"
          className='text-secondary'> Log In Now
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

      <div className="mb-6 relative">
        <div
          className='absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer'
          onClick={() => setShowPassword((pre) => ({ ...pre, pass2: !pre.pass2 }))}>
          {showPassword.pass2 ? <EyeIcon /> : <EyeCloseIcon />}
        </div>
        <input
          type={showPassword.pass2 ? "text" : "password"}
          name={"confirm_password"}
          placeholder="Confirm Password"
          className="input input-bordered w-full "
          onInput={showInputLabel}
          required />
        <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Confirm Password</span>
      </div>


      <details className="">
        <summary className="m-1 w-full flex justify-between items-center cursor-pointer bg-slate-50 py-1"
          onClick={(e) => {
            const childEls = e.currentTarget.children as HTMLCollectionOf<HTMLElement>;
            if (childEls[0].innerText === "Additional details") {
              childEls[0].innerText = "Hide details"
              childEls[1].children[0].classList.remove("rotate-90")
            } else {
              childEls[0].innerText = "Additional details"
              childEls[1].children[0].classList.add("rotate-90")
            }
          }}
        >
          <span>Additional details</span>
          <span><span className='transition-[rotate] duration-300 ease-linear inline-block rotate-90'>&rarr;</span></span>
        </summary>
        <aside className="p-2 shadow -content z-[1] w-full mt-3 transition-all duration-300 ease-linear">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className='relative'>
              <input
                type="text"
                placeholder="First name"
                className="input input-bordered w-full"
                name={"first_name"}
                required
                onInput={showInputLabel}
              />
              <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>First name</span>
            </div>
            <div className='relative'>
              <input
                type="text"
                placeholder="Last name"
                className="input input-bordered w-full"
                name={"last_name"}
                onInput={showInputLabel}
                required
              />
              <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Last name</span>
            </div>
          </div>

          <div className='mb-6 relative'>
            <textarea
              rows={4}
              placeholder="Tell about yourself"
              className="textarea textarea-bordered w-full"
              name={"bio"}
              onInput={showInputLabel}
              required
            ></textarea>
            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Tell about yourself</span>
          </div>

          <div className="mb-6 relative">
            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full"
              name={"email"}
              onInput={showInputLabel}
              required
            />
            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Email address</span>

          </div>

          <div className=" items-start mb-6 hidden">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" name="remember" value="" className="w-4 h-4 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  " />
            </div>
            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">I agree with the <a href="#" className="text-secondary hover:underline ">terms and conditions</a>.</label>
          </div>
        </aside>
      </details>

      <SubmitFormButton
        className="text-white bg-secondary hover:bg-secondary/90 focus:outline-none font-medium rounded-full text-sm w-full px-5 py-3 text-center mt-2"
      >
        Sign Up
      </SubmitFormButton>

    </form>
  )
}

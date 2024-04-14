import SignInForm from '@/components/auth/sign-in-form'
import { createUser } from '@/lib/auth/createUser';
import sendToken from '@/lib/auth/setUserToken';
import { getUserFormattedData } from '@/lib/format/user';
import React from 'react'

export default function SignIn() {

  // create user and sign in 
  const handleSignIn = async (prevState: null, queryData: FormData) => {
    "use server";
    const username = queryData.get("username");
    const password = queryData.get("password");
    const confirmPassword = queryData.get("confirm_password");
    const firstName = queryData.get("first_name");
    const lastName = queryData.get("last_name");
    const bio = queryData.get("bio");
    const email = queryData.get("email");

    if (!username || !password || !confirmPassword) {
      return { error: "Please enter all required fields" }
    }

    const userInfo = {
      username, password, confirmPassword, firstName, lastName, bio, email,
    }

    const { user, error } = await createUser(userInfo);
    if (user) {
      const { error, token } = await sendToken(user);
      return { user: getUserFormattedData(user), token }
    } else {
      return { error: String(error) }
    }
  }


  return (
    <main className='bg-slate-50 w-full flex flex-col'>
      <h1 className='text-2xl text-center mt-10 mb-2 font-e'>Sign In</h1>
      <SignInForm handleSignIn={handleSignIn} />
    </main>
  )
}

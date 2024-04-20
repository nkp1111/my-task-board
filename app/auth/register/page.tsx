import RegisterForm from '@/components/auth/register-form'
import { createUser } from '@/lib/auth/createUser';
import sendToken from '@/lib/auth/setUserToken';
import { getUserFormattedData } from '@/lib/format/user';
import React from 'react'

export default function Register() {

  // create user and sign in 
  const handleRegister = async (prevState: null, queryData: FormData) => {
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
      return { user: user, token }
    } else {
      return { error: String(error) }
    }
  }


  return (
    <main className='bg-white w-full flex flex-1 no-scrollbar'>
      <div className='min-w-64 sm:w-1/3 px-5 sm:px-16 py-5 flex flex-col'>
        <h1 className='text-2xl mt-10 mb-2 font-bold'>Sign Up</h1>
        <RegisterForm handleRegister={handleRegister} />
      </div>
      <div className='flex-1'>

      </div>
    </main>
  )
}

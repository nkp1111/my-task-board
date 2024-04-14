import React from 'react'
import SubmitFormButton from '../submitFormButton'
import { logoutUser } from '@/lib/auth/logoutUser';

export default async function LogoutBtn() {

  // create user and sign in 
  const handleLogout = async (formData: FormData) => {
    "use server";
    const { success, error } = await logoutUser();
    return { success: "User logout" };
  }

  return (
    <form action={handleLogout}>
      <SubmitFormButton
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Logout
      </SubmitFormButton>
    </form>
  )
}

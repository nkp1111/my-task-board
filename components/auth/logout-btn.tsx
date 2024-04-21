import React from 'react'
import SubmitFormButton from '../submitFormButton'
import { logoutUser } from '@/lib/auth/logoutUser';
import LogoutIcon from '../svg/logout-icon';

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
        className="text-secondary hover:text-secondary/80 font-medium rounded-lg w-full p-2 text-center shadow-sm flex items-center text-base"
      >
        <LogoutIcon className='fill-secondary' /> Logout
      </SubmitFormButton>
    </form>
  )
}

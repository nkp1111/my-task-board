"use server"

import { getUser } from '@/lib/user/getUserInfo';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AuthTemplate({ children }: { children: React.ReactNode }) {

  const { user, error } = await getUser(); // get user info
  if (user?.username) {
    redirect("/");
  }
  return (
    <>
      {children}
    </>
  )
}

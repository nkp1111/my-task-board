import React from 'react'
import { getUser } from '@/lib/user/getUserInfo';
import LogoutBtn from '../auth/logout-btn';
import NavLink from './nav-links';

export default async function Navbar() {

  const { user, error } = await getUser(); // get user info
  return (
    <nav className="border-gray-200 bg-gray-50 border-b  " >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 items-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase">MY TASK BOARD</span>
        </a>
        <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-solid-bg" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent items-center">
            <li>
              <NavLink path="home" route="/" />
            </li>
            {user?.username ? (
              <li>
                <LogoutBtn />
              </li>
            ) : (
              <>
                <li>
                  <NavLink path="register" route="/auth/register" />
                </li>
                <li>
                  <NavLink path="sign in" route="/auth/sign-in" />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav >
  )
}

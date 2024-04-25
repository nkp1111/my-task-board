import React from 'react'
import { getUser } from '@/lib/user/getUserInfo';
import LogoutBtn from '../auth/logout-btn';
import NavLink from './nav-links';
import DropdownNavItem from './dropdown-nav-item';

export default async function Navbar() {

  const { user, error } = await getUser(); // get user info
  return (
    <nav className="border-gray-200 bg-gray-50 border-b">
      <div className="flex flex-wrap items-center justify-between mx-auto md:px-16 sm:px-8 px-4 py-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase">TASK BOARD</span>
        </a>

        {/* for small screen  */}
        <DropdownNavItem user={user} LogoutBtn={<LogoutBtn />} />

        <div className="hidden w-full md:block md:w-auto md:ms-auto md:me-8" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent items-center">
            <li>
              <NavLink path="home" route="/" />
            </li>
            {!user?.username ? (
              <>
                <li>
                  <NavLink path="register" route="/auth/register" />
                </li>
                <li>
                  <NavLink path="sign in" route="/auth/sign-in" />
                </li>
              </>
            ) : <LogoutBtn />}
          </ul>
        </div>
      </div>
    </nav >
  )
}

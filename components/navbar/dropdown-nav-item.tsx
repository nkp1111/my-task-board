"use client";

import React, { useState } from 'react'
import NavLink from './nav-links';
import CloseIcon from '../svg/close-icon';

interface DropdownNavItemTypeParams {
  user: { [key: string]: any } | undefined,
  LogoutBtn: React.JSX.Element,
}

export default function DropdownNavItem({ user, LogoutBtn }: DropdownNavItemTypeParams) {
  const [showNavItem, setShowNavItem] = useState(false);
  function closeNavItem() {
    setShowNavItem(() => false);
  }

  return (
    <>
      <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-solid-bg" aria-expanded="false"
        onClick={() => setShowNavItem(pre => !pre)}>
        <span className="sr-only">Open navbar item</span>
        {showNavItem ? <CloseIcon />
          : (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          )}
      </button>

      <div className={`bg-slate-100 shadow-md absolute top-full right-10 p-2 md:hidden w-32 transition-[display] duration-300 ease-linear ${showNavItem ? "block" : "hidden"}`}>
        <ul className="flex flex-col font-medium  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0 md:bg-transparent items-end">
          <li onClick={closeNavItem}>
            <NavLink path="home" route="/" />
          </li>
          {!user?.username ? (
            <>
              <li onClick={closeNavItem}>
                <NavLink path="register" route="/auth/register" />
              </li>
              <li onClick={closeNavItem}>
                <NavLink path="sign in" route="/auth/sign-in" />
              </li>
            </>
          ) : <li className="border-t border-gray-500/30 mt-1" onClick={closeNavItem}>{LogoutBtn}</li>}
        </ul>
      </div>
    </>
  )
}

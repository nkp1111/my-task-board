"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function NavLink({ path, route }: { path: string, route: string }) {
  const pathname = usePathname();
  const currentPath = pathname === route;
  return (
    <Link href={route} className={`capitalize block py-2 px-3 md:p-0 ${currentPath ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700" : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"} `} aria-current="page">{path}</Link>
  )
}

"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function NavLink({ path, route }: { path: string, route: string }) {
  const pathname = usePathname();
  const currentPath = pathname === route;
  return (
    <Link href={route} className={`capitalize block py-2 px-3 md:p-0 ${currentPath ? "rounded bg-transparent text-blue-700" : "text-gray-900 hover:bg-transparent hover:text-blue-600"} `} aria-current="page">{path}</Link>
  )
}

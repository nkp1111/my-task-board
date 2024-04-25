"use client";

import React from 'react'
import plusIcon from "@/public/assets/Add_round_duotone.svg"
import Image from 'next/image'

export default function AddTask() {
  return (
    <div className='w-full'>
      <div className='w-full rounded-md p-5 flex items-center gap-5 bg-amber-50'>
        <span role="button" className='cursor-pointer tooltip bg-yellow-500 rounded-md h-10 w-10 flex items-center justify-center' aria-label={"Add task"}>
          <Image
            src={plusIcon}
            alt={"add task"}
            width={24}
            height={24}
            className=''
          />
        </span>
        <span className='font-bold text-lg'>Add new task</span>
      </div>
    </div>
  )
}

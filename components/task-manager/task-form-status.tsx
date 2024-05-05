"use client";

import { iconsArray } from '@/constant/sample-icons'
import { statusArray } from '@/constant/sample-task'
import Image from 'next/image'
import React, { useState } from 'react'


interface TaskFormStatusParams {
  statusSelected: string,
  handleTaskStatusChange: (newStatus: string) => void
}


export default function TaskFormStatus(
  { statusSelected, handleTaskStatusChange }: TaskFormStatusParams
) {

  return (
    <>
      {statusArray.map(status => (
        <label
          key={status._id}
          className='flex cursor-pointer rounded-md relative overflow-hidden'
        >
          <input
            type="radio"
            name="status"
            className="radio hidden peer"
            title={status.title}
            onChange={(e) => {
              if (e.currentTarget.checked) handleTaskStatusChange(status.title);
            }}
            checked={status.title === statusSelected}
          />

          <article className='border-2 border-slate-300 p-1 peer-checked:border-blue-500/80 transition-[bg] duration-300 ease-linear capitalize w-full rounded-xl items-center flex gap-3'>
            <div className={`bg-${status.color}-500 rounded-lg h-10 w-10  items-center justify-center inline-flex`}
              aria-hidden>
              {status.svg && (
                <Image
                  src={status.svg}
                  alt={""}
                  width={24}
                  height={24}
                  className=''
                />
              )}
            </div>

            <h3 className=''>
              {status.title}
            </h3>

            <aside className={`ms-auto me-3 w-5 h-5 bg-blue-600 items-center justify-center rounded-full ${statusSelected === status.title ? "flex" : "hidden"}`}>
              <Image
                src={iconsArray[2].svg}
                alt={"check"}
                aria-hidden
              />
            </aside>
          </article>
        </label>
      ))}
    </>
  )
}

"use client";

import React, { useState } from 'react'
import plusIcon from "@/public/assets/Add_round_duotone.svg"
import Image from 'next/image'
import TaskForm from './task-form';

export default function AddTask() {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const handleFormClose = () => setTaskFormOpen(false);
  return (
    <div className='w-full'>
      <div className='w-full rounded-md p-5 flex items-center gap-5 bg-amber-100'
        onClick={() => setTaskFormOpen(true)}>
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

      <TaskForm openTaskForm={taskFormOpen} closeTaskForm={handleFormClose} />
    </div>
  )
}

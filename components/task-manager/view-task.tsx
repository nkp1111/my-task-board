"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { iconsArray } from "@/constant/sample-icons"
import TaskForm from './task-form';

export default function ViewTask({ tasks }: { tasks: TaskTypeParams[] }) {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTaskData, setCurrentTaskData] = useState<TaskTypeParams | null>(null);
  const handleFormClose = () => setTaskFormOpen(false);

  return (
    <div>
      {tasks.map(task => (
        <article
          key={task._id}
          className={`w-full rounded-xl p-5 flex items-start gap-5 mb-5 bg-opacity-90 ${task.status === "in progress" ? "bg-yellow-300" : task.status === "completed" ? "bg-green-300" : task.status === "not do" ? "bg-red-300" : "bg-slate-200"} ${currentTaskData?._id === task._id && "border-2 border-blue-500"}`}
          onClick={() => {
            setCurrentTaskData(() => task)
            setTaskFormOpen(true);
          }}
        >
          <div role="button" className='cursor-pointer tooltip bg-white rounded-lg h-10 w-10 flex items-center justify-center' aria-label={"Add task"}>
            {task.icon ? (
              <Image
                src={task.icon}
                alt={"add task"}
                width={24}
                height={24}
                className=''
              />
            ) : null}
          </div>
          <div className='flex flex-col gap-1'>
            <h2 className='font-bold text-xl'>{task.name}</h2>
            <p>{task.description}</p>
          </div>

          {task.status === "in progress" ? (
            <div className='inline-flex ms-auto bg-yellow-500 rounded-lg h-10 w-10  items-center justify-center'>
              <Image
                src={iconsArray[6].svg}
                alt={"add task"}
                width={24}
                height={24}
                className=''
              />
            </div>
          ) : task.status === "completed"
            ? (<div className='inline-flex ms-auto bg-green-500 rounded-md h-10 w-10  items-center justify-center'>
              <Image
                src={iconsArray[3].svg}
                alt={"add task"}
                width={24}
                height={24}
                className=''
              />
            </div>)
            : task.status === "not do"
              ? (<div className='inline-flex ms-auto bg-red-500 rounded-md h-10 w-10  items-center justify-center'>
                <Image
                  src={iconsArray[7].svg}
                  alt={"add task"}
                  width={24}
                  height={24}
                  className=''
                />
              </div>)
              : null}

        </article>
      ))}

      <TaskForm
        openTaskForm={taskFormOpen}
        closeTaskForm={handleFormClose}
        taskData={currentTaskData} />
    </div>
  )
}

"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { iconsArray } from "@/constant/sample-icons"
import TaskForm from './task-form';
import { statusArray } from '@/constant/sample-task';

export default function ViewTask({ tasks }: { tasks: TaskTypeParams[] }) {
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTaskData, setCurrentTaskData] = useState<TaskTypeParams | null>(null);
  const handleFormClose = () => setTaskFormOpen(false);
  const removeCurrentTaskData = () => setCurrentTaskData(null);

  return (
    <div>
      <span className='hidden bg-yellow-300 bg-green-300 bg-red-300 bg-slate-300 bg-yellow-500 bg-green-500 bg-red-500 bg-slate-500'></span>

      {tasks.map(task => {
        const currentStatus = statusArray.find(status => status.title === task.status);

        if (!currentStatus) return null;
        return (
          <article
            key={task._id}
            className={`w-full rounded-xl p-5 flex items-start gap-5 mb-5 bg-opacity-90 bg-${currentStatus.color}-300 ${currentTaskData?._id === task._id && "border-2 border-blue-500"}`}
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

            <div className={`ms-auto bg-${currentStatus.color}-500 rounded-lg h-10 w-10  items-center justify-center ${currentStatus.svg ? "inline-flex" : "hidden"}`}>
              <Image
                src={currentStatus.svg}
                alt={"add task"}
                width={24}
                height={24}
                className=''
              />
            </div>
          </article>
        )
      })}

      <TaskForm
        openTaskForm={taskFormOpen}
        closeTaskForm={handleFormClose}
        taskData={currentTaskData}
        removeCurrentTask={removeCurrentTaskData} />
    </div>
  )
}

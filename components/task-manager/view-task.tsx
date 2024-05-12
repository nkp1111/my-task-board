"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { iconsArray, defaultIconsArray } from "@/constant/sample-icons"
import TaskForm from './task-form';
import { statusArray } from '@/constant/sample-task';
import useGlobalContext from '@/lib/general/context';

export default function ViewTask() {

  const { goal }: { goal: GoalTypeParams } = useGlobalContext();
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string>("");

  const handleCurrentTask = (taskId: string) => {
    const newTask = goal?.tasks?.find(task => task._id === taskId);
    if (newTask) setCurrentTaskId(newTask._id);
  }

  const closeTaskForm = () => {
    setTaskFormOpen(false);
  };

  useEffect(() => {
    if (currentTaskId) {
      setTaskFormOpen(true)
    }
  }, [currentTaskId]);

  useEffect(() => {
    if (!taskFormOpen) setCurrentTaskId("")
  }, [taskFormOpen]);


  if (!goal || !goal.tasks || !Array.isArray(goal.tasks)) {
    return null;
  }

  return (
    <div>
      <span className='hidden bg-yellow-300 bg-green-300 bg-red-300 bg-slate-300 bg-yellow-500 bg-green-500 bg-red-500 bg-slate-500'></span>

      {goal.tasks.map(task => {
        return <SingleTaskArticle
          key={task._id}
          task={task}
          currentTaskId={currentTaskId}
          handleCurrentTask={handleCurrentTask}
        />
      })}

      <TaskForm taskDataId={currentTaskId} closeTaskForm={closeTaskForm} taskFormOpen={taskFormOpen} tasks={goal.tasks} />
    </div>
  )
}



export function SingleTaskArticle(
  { task, currentTaskId, handleCurrentTask }:
    { task: TaskTypeParams, handleCurrentTask: (taskId: string) => void, currentTaskId: string }
) {

  const currentStatus = statusArray.find(status => status.title === task.status);
  if (!currentStatus) return null;

  let taskIcon;
  if (task.icon) {
    taskIcon = defaultIconsArray.find((icon) => icon.title === task.icon);
  }

  return (
    <article
      key={task._id}
      className={`w-full rounded-xl p-5 flex items-start gap-5 mb-5 bg-opacity-90 cursor-pointer bg-${currentStatus.color}-300 ${currentTaskId === task._id && "border-2 border-blue-500"}`}
      onClick={() => handleCurrentTask(task._id)}
    >
      <div role="button" className='cursor-pointer tooltip bg-white rounded-lg h-10 w-10 flex items-center justify-center' aria-label={"Add task"}>
        {taskIcon ? (
          <Image
            src={taskIcon.svg}
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
        {currentStatus.svg && (
          <Image
            src={currentStatus.svg}
            alt={"add task"}
            width={24}
            height={24}
            className=''
          />
        )}
      </div>
    </article>
  )
}

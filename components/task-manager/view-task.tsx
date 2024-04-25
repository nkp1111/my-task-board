
import Image from 'next/image'
import React from 'react'
import { iconsArray } from "@/constant/sample-icons"

export default function ViewTask({ tasks }: { tasks: TaskTypeParams[] }) {



  return (
    <div>
      {tasks.map(task => (
        <article key={task.id} className={`w-full rounded-xl p-5 flex items-start gap-5 mb-5 bg-opacity-90 ${task.status === "in progress" ? "bg-yellow-300" : task.status === "completed" ? "bg-green-300" : task.status === "not do" ? "bg-red-300" : "bg-slate-200"}`}>
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
                src={iconsArray[2].svg}
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
    </div>
  )
}

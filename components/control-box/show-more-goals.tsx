import React, { useEffect, useState } from 'react'
import EyeCloseIcon from '../svg/eye-close-icon';
import EyeIcon from '../svg/eye-icon';
import CloseIcon from '../svg/close-icon';
import useGlobalContext from '@/lib/general/context';
import Link from 'next/link';
import { iconsArray } from '@/constant/sample-icons';
import Image from 'next/image';

export default function ShowMoreGoals() {
  const [showGoals, setShowGoals] = useState(false);
  const handleShowGoals = () => setShowGoals(pre => !pre);
  const { allGoals, setGoalById } = useGlobalContext();

  useEffect(() => {
    if (showGoals) {
      document.querySelector("body")?.classList.add("overflow-hidden")
    } else {
      document.querySelector("body")?.classList.remove("overflow-hidden")
    }
  }, [showGoals]);

  return (
    <div className={`grid place-items-center  rounded-full size-16`}
    >
      <span
        className='grid place-items-center tooltip bg-error size-full opacity-50 rounded-full hover:opacity-100 transition-opacity duration-300 ease-linear cursor-pointer'
        onClick={handleShowGoals}
        data-tip="Show Task List"
      >
        {showGoals ? <EyeCloseIcon className='stroke-error-content' /> : <EyeIcon className='stroke-error-content' />}
      </span>


      <article className={`fixed bg-black/50 z-50 ${showGoals ? "block" : "hidden"} top-0 left-0 right-0 bottom-0 grid place-items-center`}>
        <div className='bg-white shadow-sm rounded-sm max-w-5xl mx-auto mt-16 p-10 w-full h-[calc(100vh-7rem)]'>
          <div className='flex justify-between gap-2 items-center'>
            <h2 className='text-xl font-bold'>All Goals </h2>
            <span
              className='cursor-pointer'
              onClick={handleShowGoals}
            ><CloseIcon /></span>
          </div>

          <RenderGoals
            goals={allGoals}
            setGoalById={setGoalById}
            handleShowGoals={handleShowGoals}
          />
        </div>
      </article>
    </div>
  )
}



export function RenderGoals(
  { goals, setGoalById, handleShowGoals }:
    { goals: GoalTypeParams[], setGoalById: (id: string) => Promise<any>, handleShowGoals: () => void }
) {

  if (!goals || goals.length === 0) return <p>No Task data available</p>

  return (
    <ul className='flex gap-3 flex-col *:border-b-2 *:border-gray-500 *:mt-5 *:py-2'>
      {goals.map((goal, index) => (
        <li key={goal._id} className='flex gap-3 items-center'>
          <span className='w-10'>#{index + 1}</span>
          <span>{goal._id.slice(-8)}</span>
          <span className='flex-1'>
            <span>{goal.name}</span>
            <span>{goal.createdAt?.toString()}</span>
            <ol className='flex'>
              {goal.tasks?.slice(0, 3)?.map(task => (
                <li key={task._id}>{task.name}</li>
              ))}
            </ol>
          </span>
          <span className='flex gap-3 items-center'>
            <span className='rounded-full border border-gray-500 p-1 shadow-sm hover:scale-105 transition-[scale] duration-300 ease-linear cursor-pointer' onClick={() => {
              setGoalById(goal._id)
              handleShowGoals()
            }}>
              <EyeIcon />
            </span>

            <DeleteGoal goalId={goal._id} handleShowGoals={handleShowGoals} />
          </span>
        </li>
      ))}
    </ul>
  )
}


export function DeleteGoal({ goalId, handleShowGoals }: { goalId: string, handleShowGoals: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal(pre => !pre);

  const { deleteGoal } = useGlobalContext();

  return (
    <span className='bg-error/80 rounded-full p-2 cursor-pointer relative'>
      <Image
        src={iconsArray[5].svg}
        alt={iconsArray[5].title}
        width={20}
        height={20}
        onClick={handleModal}
      />

      <aside className={`${showModal ? "flex" : "hidden"} absolute right-full top-full gap-5 bg-slate-50 rounded-sm shadow-lg p-4 w-72 flex-col`}>
        <span className='flex gap-1 flex-col'>
          <span className='text-lg'>{goalId.slice(-8)}</span>
          <span>Are you sure you want to delete this task?</span>
        </span>
        <span className='flex w-full gap-3 *:flex-1'>
          <button type="button" className='bg-slate-200 rounded-sm p-3'
            onClick={handleModal}>No, keep it</button>
          <button type="button" className='bg-error text-error-content rounded-sm p-3'
            onClick={() => {
              deleteGoal(goalId);
              handleModal();
              handleShowGoals();
            }}>Yes, delete it</button>
        </span>
      </aside>
    </span>
  )
}

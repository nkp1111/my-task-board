import React from 'react'
import AddTask from './add-task'
import ViewTask from './view-task'

export default function TaskManager() {

  return (
    <div className='mt-5'>
      <ViewTask />
      <AddTask />
    </div>
  )
}

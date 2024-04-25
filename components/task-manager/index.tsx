import React from 'react'
import AddTask from './add-task'
import ViewTask from './view-task'
import { sampleGoal } from '@/constant/sample-task'

export default function TaskManager({ currentGoalId }: { currentGoalId?: string }) {

  let goalDetail = sampleGoal;
  if (currentGoalId) {
    // goalDetail = "coming soon";
  }
  return (
    <div className='mt-5'>
      <ViewTask tasks={goalDetail.tasks} />
      <AddTask />
    </div>
  )
}

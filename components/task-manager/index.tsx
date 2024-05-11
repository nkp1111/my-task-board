"use client";

import React, { useEffect, useState } from 'react'
import AddTask from './add-task'
import ViewTask from './view-task'
import { sampleGoal } from '@/constant/sample-task'

export default function TaskManager() {
  const [allGoals, setAllGoals] = useState([]);
  const [goal, setGoal] = useState<GoalTypeParams>(sampleGoal);
  useEffect(() => {

    fetch("/api/goals", {
      credentials: "include",
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Api response failed");
      })
      .then(data => {
        if (data?.success) {
          setAllGoals(data.goals);
          setGoal(data.goal);
          console.log(data.goal);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='mt-5'>
      <ViewTask goal={goal} />
      <AddTask />
    </div>
  )
}

"use client";

import { showAlert } from '@/lib/alert';
import React, { createContext, useEffect, useState } from 'react'

const AppContext = createContext<any>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [allGoals, setAllGoals] = useState([]);
  const [goal, setGoal] = useState({});
  useEffect(() => {
    fetch("/api/goals")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        showAlert("Failed to fetch goals!", "error");
        throw new Error("Failed to fetch goals");
      })
      .then(data => {
        if (data.error) {
          showAlert(data.error || "Something went wrong", "error");
          return;
        }
        if (data.goals) setAllGoals(data.goals);
        if (data.goal) setGoal(data.goal);
      })
      .catch(err => {
        console.log(err);
        showAlert(err || "Something went wrong", "error");
      })
  }, []);

  const setGoalById = async (id: string) => {
    // params id: goal id
    // returns data: {goal}
    // desc: fetch goal by id
    const res = await fetch("/api/goals?id=" + id);
    if (res.ok) {
      const data = await res.json();
      if (data.error) {
        showAlert(data.error || "Something went wrong", "error");
        return;
      }
      setGoal(() => data.goal);
      return data;
    }
    showAlert("Failed to fetch goals!", "error");
    return;
  }

  const saveGoal = () => {
    // save/update current goal to database
    // TODO: add logic for saving/updating goal
    setLoading(() => true);
    showAlert("Saving goal...", "info");
    setTimeout(() => {
      showAlert("Goal saved!", "success");
      setLoading(() => false);
    }, 2000);
  }

  return (
    <AppContext.Provider
      value={{
        allGoals,
        goal,
        setGoalById,
        saveGoal,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


export {
  AppProvider,
  AppContext,
}
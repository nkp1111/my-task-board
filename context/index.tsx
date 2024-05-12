"use client";

import { sampleGoal } from '@/constant/sample-task';
import { showAlert } from '@/lib/alert';
import React, { createContext, useEffect, useState } from 'react'

const AppContext = createContext<any>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [allGoals, setAllGoals] = useState<GoalTypeParams[]>([]);
  const [goal, setGoal] = useState<GoalTypeParams | null>(null);

  useEffect(() => {
    fetch("/api/goals", { credentials: "include" })
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
      })
      .catch(err => {
        console.log(err);
        showAlert(err || "Something went wrong", "error");
      })
  }, []);

  useEffect(() => {
    let goalStored = JSON.parse(localStorage.getItem("goal") || "{}");
    if (goalStored && goalStored?._id) {
      setGoal(goalStored);
    } else {
      // TODO: find latest active goal  <->
      if (allGoals && allGoals.length > 0) {
        const activeGoalId = allGoals?.[0]?._id;
        setGoalById(activeGoalId);
      } else {
        setGoal(sampleGoal)
      }
    }
  }, [allGoals]);

  const setGoalById = async (id: string) => {
    if (!id) return;
    // params id: goal id
    // returns data: {goal}
    // desc: fetch goal by id
    const res = await fetch("/api/goals?id=" + id, { credentials: "include" });
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
    if (!goal) return;
    setLoading(() => true);
    showAlert("Saving goal...", "info");
    if (goal._id === "1") {
      // save new goal
      fetch("/api/goals", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(goal),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Failed to create goal!");
        })
        .then(data => {
          if (data.error) {
            showAlert(data.error || "Something went wrong", "error");
            setLoading(() => false);
            return;
          }
          showAlert("New goal created", "success");
          setLoading(() => false);
        })
        .catch(err => {
          console.log(err);
          showAlert(err || "Something went wrong", "error");
          setLoading(() => false);
        })
    } else {
      // update old goal
      fetch("/api/goals", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(goal),
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Failed to update goal");
        })
        .then(data => {
          if (data.error) {
            showAlert(data.error || "Something went wrong", "error");
            setLoading(() => false);
            return;
          }
          showAlert("Goal updated successfully", "success");
          setLoading(() => false);
        })
        .catch(err => {
          console.log(err);
          showAlert(err || "Something went wrong", "error");
          setLoading(() => false);
        })
    }
  }

  useEffect(() => {
    if (goal) localStorage.setItem("goal", JSON.stringify(goal));
  }, [goal]);


  return (
    <AppContext.Provider
      value={{
        allGoals,
        goal,
        setGoal,
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
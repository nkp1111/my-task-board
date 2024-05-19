"use client";

import { sampleGoal } from '@/constant/sample-task';
import { showAlert } from '@/lib/alert';
import React, { createContext, useEffect, useState } from 'react'

const AppContext = createContext<any>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [allGoals, setAllGoals] = useState<GoalTypeParams[]>([]);
  const [goal, setGoal] = useState<GoalTypeParams | null>(null);
  const [userId, setUserId] = useState("");

  // useEffect(() => {
  //   const goal = JSON.parse(localStorage.getItem("goal") || "{}")
  //   if (goal && userId && goal.userId && goal.userId !== userId) localStorage.removeItem("goal");
  // }, [userId]);

  const saveNewGoal = (goal: GoalTypeParams) => {
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

        setGoal(data.goal);
        showAlert("New goal created", "success");
        setLoading(() => false);
      })
      .catch(err => {
        console.log(err);
        showAlert((err || "Something went wrong"), "error");
        setLoading(() => false);
      })
  }

  const updateOldGoal = (goal: GoalTypeParams) => {
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
        showAlert((err || "Something went wrong"), "error");
        setLoading(() => false);
      })
  }


  // delete goal
  const deleteGoal = (goalId: string) => {
    fetch("/api/goals", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ goalId }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to delete goal");
      })
      .then(data => {
        if (data.error) {
          showAlert(data.error || "Something went wrong", "error");
          setLoading(() => false);
          return;
        }
        showAlert("Goal deleted successfully", "success");
        setLoading(() => false);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        showAlert((err || "Something went wrong"), "error");
        setLoading(() => false);
      })
  }

  useEffect(() => {
    if (userId) {
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
    }
  }, [userId]);

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
    if (!id || !userId) return;
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
    if (!goal) return;
    if (!userId) {
      showAlert("Please sign in first", "info");
      return;
    }
    setLoading(() => true);
    showAlert("Saving goal...", "info");
    if (goal._id === "1" || goal._id.length !== 24) {
      // save new goal
      saveNewGoal(goal)
    } else {
      // update old goal
      updateOldGoal(goal);
    }
  }

  // add goal changes to local storage
  useEffect(() => {
    if (goal) localStorage.setItem("goal", JSON.stringify(goal));
  }, [goal]);

  // set current goal userId to signed in user
  useEffect(() => {
    if (userId && goal && !goal.userId) setGoal((pre: any) => ({ ...pre, userId }))
  }, [goal, userId]);


  const addNewGoal = () => {
    console.log('adding new goal', allGoals)
    const newGoal = {
      name: "New Task Board",
      _id: "1",
      userId: "",
      tasks: [],
      createdAt: "",
      updatedAt: "",
    }
    setGoal(newGoal);
    saveNewGoal(newGoal);
  }

  return (
    <AppContext.Provider
      value={{
        allGoals,
        goal,
        setGoal,
        setGoalById,
        saveGoal,
        loading,
        userId,
        setUserId,
        deleteGoal,
        addNewGoal,
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
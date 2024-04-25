import { iconsArray } from "./sample-icons"

export const sampleGoal = {
  name: "My Task Board",
  _id: "1",
  tasks: [
    {
      id: 1,
      name: "Task in Progress",
      description: "",
      icon: iconsArray[6].svg,
      status: "in progress",
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      id: 2,
      name: "Task Completed",
      description: "",
      icon: iconsArray[2].svg,
      status: "completed",
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      id: 3,
      name: "Task won't do",
      description: "",
      icon: iconsArray[6].svg,
      status: "not do",
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      id: 4,
      name: "Task To Do",
      description: "",
      icon: iconsArray[6].svg,
      status: "not started",
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
  ]
}
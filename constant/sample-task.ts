import { iconsArray, defaultIconsArray } from "./sample-icons"

export const sampleGoal = {
  name: "My Task Board",
  _id: "1",
  tasks: [
    {
      id: 1,
      name: "Task in Progress",
      description: "",
      icon: defaultIconsArray[0].svg,
      status: "in progress",
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      id: 2,
      name: "Task Completed",
      description: "",
      icon: defaultIconsArray[1].svg,
      status: "completed",
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      id: 3,
      name: "Task won't do",
      description: "",
      icon: defaultIconsArray[6].svg,
      status: "not do",
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      id: 4,
      name: "Task To Do",
      description: "Work on a challenge. Learn Typescript.",
      icon: defaultIconsArray[2].svg,
      status: "not started",
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
  ]
}
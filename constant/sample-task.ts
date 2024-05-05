import { iconsArray, defaultIconsArray } from "./sample-icons"



export const statusArray: TaskStatusTypeParams[] = [
  {
    _id: "1",
    title: "in progress",
    svg: iconsArray[6].svg,
    color: "yellow",
  },
  {
    _id: "2",
    title: "completed",
    svg: iconsArray[3].svg,
    color: "green",
  },
  {
    _id: "3",
    title: "won't do",
    svg: iconsArray[7].svg,
    color: "red",
  },
  {
    _id: "4",
    title: "not started",
    svg: "",
    color: "slate",
  },
];




export const sampleGoal = {
  name: "My Task Board",
  _id: "1",
  tasks: [
    {
      _id: "1",
      name: "Task in Progress",
      description: "",
      icon: defaultIconsArray[0].title,
      status: statusArray[0].title,
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      _id: "2",
      name: "Task Completed",
      description: "",
      icon: defaultIconsArray[1].title,
      status: statusArray[1].title,
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      _id: "3",
      name: "Task won't do",
      description: "",
      icon: defaultIconsArray[6].title,
      status: statusArray[2].title,
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
    {
      _id: "4",
      name: "Task To Do",
      description: "Work on a challenge. Learn Typescript.",
      icon: defaultIconsArray[2].title,
      status: statusArray[3].title,
      createdAt: "",
      updatedAt: "",
      completedAt: "",
    },
  ]
}
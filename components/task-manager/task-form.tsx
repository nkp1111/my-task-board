import React, { useEffect, useState } from 'react'
import { iconsArray, defaultIconsArray } from '@/constant/sample-icons';
import Image from 'next/image';
import TaskFormStatus from './task-form-status';
import { showAlert } from '@/lib/alert';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';


interface TaskFormTypeParams {
  taskDataId?: string;
  closeTaskForm: () => void;
  taskFormOpen: boolean;
}

function getAllTasks(): TaskTypeParams[] {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function getTaskById(taskId: string): TaskTypeParams | undefined {
  const allTasks = getAllTasks();
  const taskExist = allTasks.find((task: TaskTypeParams) => task._id === taskId);
  return taskExist;
}

export default function TaskForm({ taskFormOpen, taskDataId, closeTaskForm }: TaskFormTypeParams) {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["goal_name", "tasks"]);

  // initialize task data
  const [taskDataInForm, setTaskDataInForm] = useState({
    _id: Date.now().toString(),
    name: "",
    description: "",
    icon: "",
    status: "not started",
  });

  // handle status change
  const handleTaskStatusChange = (newStatus: string) => {
    setTaskDataInForm((pre) => ({ ...pre, status: newStatus }));
  }

  // add css for when modal is open
  useEffect(() => {
    if (taskFormOpen) {
      document.querySelector("body")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    }
  }, [taskFormOpen]);

  // update task data on change
  useEffect(() => {
    if (taskDataId) {
      const currentTask = getTaskById(taskDataId);
      if (!currentTask) return;
      setTaskDataInForm(() => ({
        _id: currentTask?._id || "",
        name: currentTask?.name || "",
        description: currentTask?.description || "",
        icon: currentTask?.icon || "",
        status: currentTask?.status || "not started",
      }))
    }
  }, [taskDataId]);


  // useEffect(() => {
  //   const allTasks: TaskTypeParams[] = getAllTasks();
  //   const updatedTasks = allTasks.map(task => {
  //     if (task._id === taskDataId) return { ...task, ...taskDataInForm };
  //     else return task;
  //   });
  //   console.log('here updating tasks', updatedTasks);
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  // }, [taskDataInForm, taskDataId]);



  // save task to local storage as well as cookies
  function updateAndSaveTask() {
    const allTasks = getAllTasks();
    const taskExist = getTaskById(taskDataInForm._id);
    let updatedTasks = allTasks;
    if (taskExist) {
      // update old task
      updatedTasks = allTasks.map((task: TaskTypeParams) => {
        if (task._id === taskDataInForm._id) {
          return { ...task, ...taskDataInForm }
        }
        return task;
      })

      showAlert("Task updated successfully", "success")
    } else {
      // save new task
      if (!taskDataInForm.description || !taskDataInForm.status || !taskDataInForm.name || !taskDataInForm.icon) return;

      updatedTasks = [
        ...allTasks,
        {
          completedAt: "-",
          createdAt: "-",
          updatedAt: "-",
          ...taskDataInForm,
        }];

      showAlert("Task added successfully", "success")
    }

    // save tasks in cookies
    if (!cookies.tasks) {
      setCookie("tasks", encodeURIComponent(JSON.stringify(updatedTasks)));
    } else {
      const allSavedTasks = JSON.parse(decodeURIComponent(cookies.tasks));
      setCookie("tasks", encodeURIComponent(JSON.stringify([...allSavedTasks, { ...taskDataInForm }])));
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    closeTaskForm()
    router.push("/")
  }


  // remove tasks from local storage as well as cookies
  function removeTask(taskId: string) {
    const allTasks = getAllTasks();
    const taskExist = getTaskById(taskDataInForm._id);
    if (!taskExist) return;

    let updatedTasks = allTasks.filter((task: TaskTypeParams) => task._id !== taskDataInForm._id);

    const allSavedTasks = JSON.parse(decodeURIComponent(cookies.tasks));
    const updateSavedTasks = allSavedTasks.filter((task: TaskTypeParams) => task._id !== taskDataInForm._id);
    setCookie("tasks", encodeURIComponent(JSON.stringify(updateSavedTasks)));

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    showAlert("Task removed successfully", "success")

    closeTaskForm()
    router.push("/")
  }


  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 ${taskFormOpen ? "block" : "hidden"}`}>
      <section className="flex lg:w-1/2 2xl:w-2/5 w-auto absolute top-5 right-5 bottom-5 bg-white rounded-lg p-5 flex-col overflow-y-auto no-scrollbar">

        <div className="flex justify-between items-center ">
          <h2 className="font-medium text-xl"> Task details</h2>
          <button type="button" onClick={closeTaskForm} aria-label='Close' className='btn bg-white border border-slate-200 w-12 h-8 flex justify-center items-center p-0 hover:bg-white group hover:border-slate-200'>
            <Image
              src={iconsArray[8].svg}
              alt="Close"
              className='group-hover:scale-125 transition-[transform] duration-300 ease-linear'
            />
          </button>
        </div>

        <form className="w-full">
          <label className="form-control w-full mt-4">
            <div className="label py-1">
              <span className="label-text">Task name</span>
            </div>
            <input
              type="text"
              placeholder="Task name"
              className="input border-2 bg-white border-slate-200 focus:border-blue-500 w-full focus:shadow-none focus:outline-none"
              name="task_name"
              value={taskDataInForm.name}
              onChange={(e) => setTaskDataInForm((pre) => ({ ...pre, name: e.target.value }))}
            />
          </label>

          <label className="form-control w-full mt-4">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea className="textarea border-2 bg-white border-slate-200 focus:border-blue-500 w-full focus:shadow-none focus:outline-none h-32 text-base" placeholder="Enter a short description"
              value={taskDataInForm.description}
              onChange={(e) => setTaskDataInForm((pre) => ({ ...pre, description: e.target.value }))}></textarea>
          </label>

          <div className="form-control w-full mt-4 flex">
            <div className="label">
              <span className="label-text">Icon</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              {defaultIconsArray.map(icon => (
                <label key={icon.id} className='border  w-12 h-12 flex items-center justify-center border-slate-200 cursor-pointer rounded-md relative'
                >
                  <input
                    type="radio"
                    name="icon"
                    className="radio hidden peer"
                    title={icon.title}
                    checked={taskDataInForm.icon === icon.title}
                    onChange={() => setTaskDataInForm((pre) => ({ ...pre, icon: icon.title }))}
                  />
                  <div className='w-full h-full absolute top-0 left-0 bg-slate-200 p-3 peer-checked:bg-yellow-300/80 transition-[bg] duration-300 ease-linear tooltip rounded-md'
                    data-tip={`${icon.title}`}>
                    <Image
                      src={icon.svg}
                      alt={icon.title}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-control w-full mt-4 flex">
            <div className="label">
              <span className="label-text">Status</span>
            </div>
            <div className='grid grid-cols-2 w-full gap-2'>
              <TaskFormStatus statusSelected={taskDataInForm.status} handleTaskStatusChange={handleTaskStatusChange} />
            </div>
          </div>

          <div className='mt-20 flex items-center justify-end gap-3'>
            <button
              type="button"
              aria-label='delete this task'
              className={`h-10 w-32 rounded-full bg-gray-500 text-white !flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-90 disabled:pointer-events-none disabled:tooltip`}
              disabled={!taskDataId}
              onClick={() => {
                removeTask(taskDataInForm._id)
              }}
              data-tip={"First create the task to delete first!"}
            >
              <span>Delete</span>
              <Image
                src={iconsArray[5].svg}
                alt={iconsArray[5].title}
                className='w-5 h-5'
              />
            </button>
            <button
              type="button"
              className={`h-10 w-32 rounded-full bg-blue-600 text-white !flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-90 disabled:tooltip disabled:tooltip-top disabled:pointer-events-none`}
              aria-label='save this task'
              disabled={!taskDataInForm.description || !taskDataInForm.icon || !taskDataInForm.name || !taskDataInForm.status}
              data-tip={"Please fill all fields"}
              onClick={updateAndSaveTask}
            >
              <span>Save</span>
              <Image
                src={iconsArray[2].svg}
                alt={iconsArray[2].title}
                className='w-5 h-5'
              />
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

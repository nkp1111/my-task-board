import React, { useEffect } from 'react'

export default function TaskForm({ taskData, openTaskForm = false, closeTaskForm }: { taskData?: any, openTaskForm?: boolean, closeTaskForm: () => void }) {
  useEffect(() => {
    if (openTaskForm) {
      document.querySelector("body")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    }
  }, [openTaskForm]);
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-50 ${openTaskForm ? "block" : "hidden"}`}>
      <div className="flex lg:w-1/2 2xl:w-2/5 w-auto absolute top-5 right-5 bottom-5 bg-white rounded-lg">
        task form
        <button type="button" onClick={closeTaskForm}>X</button>
      </div>
    </div>
  )
}

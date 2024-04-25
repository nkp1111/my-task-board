import Logo from "@/components/logo"
import TaskManager from "@/components/task-manager";
import editSvg from "@/public/assets/Edit_duotone.svg"
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 py-2 md:px-16 sm:px-8 px-4">
      <div className="flex items-start gap-3">
        <Logo />
        <div className="flex flex-col gap-3">
          <h1 className="md:text-5xl text-4xl">My Task Board</h1>
          <p>Tasks to keep organized</p>
        </div>
        <span className="tooltip tooltip-bottom cursor-pointer" data-tip={"Edit"}>
          <Image
            src={editSvg}
            alt={"Edit"}
            className="w-8 h-8 mt-1"
          />
        </span>
      </div>

      <div className="flex flex-col lg:w-1/2 2xl:w-2/5 w-full mx-auto">
        <TaskManager />
      </div>

    </main>
  );
}

import Logo from "@/components/logo"
import TaskManager from "@/components/task-manager";
import TaskBoardName from "@/components/task-manager/task-board-name";


export default function Home() {

  return (
    <main className="flex flex-1 flex-col items-center bg-slate-50 py-2 md:px-16 sm:px-8 px-4 overflow-y-auto">
      <div className="flex items-start sm:gap-4 gap-3">
        <div className="mt-3">
          <Logo />
        </div>
        <TaskBoardName />
      </div>

      <div className="flex flex-col lg:w-1/2 2xl:w-2/5 w-full mx-auto">
        <TaskManager />
      </div>

    </main>
  );
}

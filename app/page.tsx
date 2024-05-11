import Logo from "@/components/logo"
import TaskManager from "@/components/task-manager";
import TaskBoardName from "@/components/task-manager/task-board-name";
import { handleSaveGoal } from "@/lib/user/handleSaveGoal";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50 py-2 md:px-16 sm:px-8 px-4">
      <div className="flex items-start gap-3">
        <Logo handleSaveGoal={handleSaveGoal} />
        <TaskBoardName />
      </div>

      <div className="flex flex-col lg:w-1/2 2xl:w-2/5 w-full mx-auto">
        <TaskManager />
      </div>

    </main>
  );
}

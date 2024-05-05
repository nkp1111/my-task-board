import { cookies } from "next/headers";
import { getUser } from "./getUserInfo";
import { dbConnect } from "@/config/mongoose-client";
import { Goal } from "@/models/goals";
import { TaskValidationSchema, GoalValidationSchema } from "../general/validation";
import { validationErrorMessage } from "../format/validation-error-msg";

export const handleSaveGoal = async (prevState: any, queryData: FormData) => {
  "use server";

  try {
    const connection = await dbConnect();
    if (!connection) {
      throw new Error("Couldn't connect to mongo database")
    }

    const goalName = cookies().get("goal_name")?.value;
    const tasks = cookies().get("tasks")?.value;
    const userInfo = await getUser();

    let tasksArray: TaskTypeParams[] | any[] = []
    if (tasks) {
      tasksArray = JSON.parse(decodeURIComponent(tasks));
      const tasksIdIndex = tasksArray.map(task => task._id);
      tasksArray = tasksArray.filter((task, index) => tasksIdIndex.indexOf(task._id) === index).map(task => {
        delete task._id;
        delete task.createdAt;
        delete task.updatedAt;
        if (task.status === "completed" && !task.completedAt) task.completedAt = new Date();

        return task;
      })
    }

    if (!goalName) return { error: "No task to save" };
    const goalInfo = {
      name: goalName,
      userId: userInfo?.user?._id,
      tasks: tasksArray,
    }

    // validate goal schema with userId
    const { success, error, data } = GoalValidationSchema.safeParse(goalInfo);
    if (error) return { error: validationErrorMessage(error) }

    // save user goal
    const goalExist = await Goal.findOne({ userId: goalInfo.userId, name: goalName });
    if (goalExist) {
      // update goal
      const updatedGoal = await Goal.updateOne({ userId: goalInfo.userId, name: goalName }, { $set: { tasks: data.tasks } });
      console.log(updatedGoal, 'updated goal');
    } else {
      // create goal
      const goal = await Goal.create({ ...data, userId: goalInfo.userId });
      console.log(goal, 'new goal created');
    }

    return { success: "Goal saved successfully" }

  } catch (error) {
    return { error: String(error) }
  }

}
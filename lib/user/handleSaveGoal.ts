import { cookies } from "next/headers";
import { getUser } from "./getUserInfo";
import { dbConnect } from "@/config/mongoose-client";
import { Goal } from "@/models/goals";
import { TaskValidationSchema, GoalValidationSchema } from "../general/validation";

export const handleSaveGoal = async (prevState: any, queryData: FormData) => {
  "use server";

  try {
    const connection = await dbConnect();
    if (!connection) {
      throw new Error("Couldn't connect to mongo database")
    }

    const goalName = cookies().get("goal_name");
    const userInfo = await getUser();
    let tasks = cookies().get("tasks");
    if (tasks) tasks = JSON.parse(decodeURIComponent(String(tasks)));
    console.log(goalName, userInfo?.user?._id, tasks);

    if (!goalName) return { error: "No task to save" };
    const goalInfo = {
      name: goalName,
      userId: userInfo?.user?._id,
      tasks,
    }

    // validate goal schema with userId
    const { success, error, data } = GoalValidationSchema.safeParse(goalInfo);
    // save user goal
    const goal = await Goal.create(data);

    return { success: "Goal saved successfully" }

  } catch (error) {
    return { error: String(error) }
  }

}
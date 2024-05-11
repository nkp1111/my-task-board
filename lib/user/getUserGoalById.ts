import { getUser } from "./getUserInfo";
import { dbConnect } from "@/config/mongoose-client";
import { Goal } from "@/models/goals";
import { getGoalFormatted } from "../format/goal";

export const getUserGoalById = async (goalId: string) => {
  "use server";

  try {
    const connection = await dbConnect();
    if (!connection) {
      throw new Error("Couldn't connect to mongo database")
    }

    const userInfo = await getUser();
    if (!userInfo?.user?._id) return { error: "User not found" };

    // save user goal
    const goal = await Goal.findOne({ userId: userInfo.user._id, _id: goalId });
    if (!goal) return { error: "User goal not found" };

    return { success: "User goal fetched successfully", goal }

  } catch (error) {
    return { error: String(error) }
  }

}
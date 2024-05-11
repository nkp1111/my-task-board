import { getUser } from "./getUserInfo";
import { dbConnect } from "@/config/mongoose-client";
import { Goal } from "@/models/goals";
import { getGoalFormatted } from "../format/goal";

export const getUserGoals = async () => {
  "use server";

  try {
    const connection = await dbConnect();
    if (!connection) {
      throw new Error("Couldn't connect to mongo database")
    }

    const userInfo = await getUser();

    if (!userInfo?.user?._id) return { error: "User not found" };

    // save user goal
    const goals = await Goal.find({ userId: userInfo.user._id })
      .sort({ updatedAt: -1 })
      .exec();
    const formattedGoals = getGoalFormatted(goals);

    return {
      success: "User goals fetched successfully",
      goals: formattedGoals,
      goal: goals[0],
    }

  } catch (error) {
    return { error: String(error) }
  }

}
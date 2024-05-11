import { dbConnect } from "@/config/mongoose-client";
import getJwtUser from "@/lib/auth/getJwtUser";
import { getGoalFormatted } from "@/lib/format/goal";
import { getUserFormattedData } from "@/lib/format/user";
import { Goal } from "@/models/goals";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

  try {
    const connection = await dbConnect();
    if (!connection) {
      return NextResponse.json({ error: "Couldn't connect to mongo database" }, { status: 400 });
    }

    const user = await getJwtUser();
    let userInfo: UserTypeSchema | null = null;
    if (user) {
      userInfo = getUserFormattedData(user);
    }

    if (!userInfo?._id) return NextResponse.json({ error: "User not found" }, { status: 400 });

    // save user goal
    const goals = await Goal.find({ userId: userInfo._id })
      .sort({ updatedAt: -1 })
      .exec();
    const formattedGoals = getGoalFormatted(goals);

    return NextResponse.json({
      success: "User goals fetched successfully",
      goals: formattedGoals,
      goal: goals[0],
    }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }

}
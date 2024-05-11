import { dbConnect } from "@/config/mongoose-client";
import getJwtUser from "@/lib/auth/getJwtUser";
import { getGoalFormatted } from "@/lib/format/goal";
import { getUserFormattedData } from "@/lib/format/user";
import { validationErrorMessage } from "@/lib/format/validation-error-msg";
import { GoalValidationSchema } from "@/lib/general/validation";
import { Goal } from "@/models/goals";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  try {
    const connection = await dbConnect();
    if (!connection) {
      return NextResponse.json({ error: "Couldn't connect to mongo database" }, { status: 400 });
    }

    const user = await getJwtUser();
    if (!user || !user?._id) return NextResponse.json({ error: "User not signed in" }, { status: 400 });

    const url = request.url;
    console.log(url, "get request url here");

    // save user goal
    const goals = await Goal.find({ userId: user._id })
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


export async function POST(request: NextRequest) {

  try {
    const connection = await dbConnect();
    if (!connection) {
      return NextResponse.json({ error: "Couldn't connect to mongo database" }, { status: 400 });
    }

    const user = await getJwtUser();
    if (!user || !user?._id) return NextResponse.json({ error: "User not signed in" }, { status: 400 });

    const goalInfo = await request.json();

    // validate goal schema with userId
    const { success, error, data } = GoalValidationSchema.safeParse(goalInfo);
    if (error) return { error: validationErrorMessage(error) }

    const goal = await Goal.create({ ...data, userId: user._id });
    console.log(goal, 'new goal created');

    return NextResponse.json({ success: "Goal saved successfully", goal }, { status: 400 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}


export async function PATCH(request: NextRequest) {

  try {
    const connection = await dbConnect();
    if (!connection) {
      return NextResponse.json({ error: "Couldn't connect to mongo database" }, { status: 400 });
    }

    const user = await getJwtUser();
    if (!user || !user?._id) return NextResponse.json({ error: "User not signed in" }, { status: 400 });

    const goalInfo = await request.json();

    // validate goal schema with userId
    const { success, error, data } = GoalValidationSchema.safeParse(goalInfo);
    if (error) return { error: validationErrorMessage(error) }

    const goal = await Goal.updateOne(
      { userId: user._id },
      { $set: { tasks: data.tasks, goalName: data.name } });

    console.log(goal, 'updated goal');

    return NextResponse.json({ success: "Goal saved successfully", goal }, { status: 400 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}


export async function DELETE(request: NextRequest) {

  try {
    const connection = await dbConnect();
    if (!connection) {
      return NextResponse.json({ error: "Couldn't connect to mongo database" }, { status: 400 });
    }

    const user = await getJwtUser();
    if (!user || !user._id) NextResponse.json({ error: "User not signed in" }, { status: 400 });

    const { goalId }: { goalId: string } = await request.json();

    const goal = await Goal.deleteOne({ userId: user?._id, _id: goalId });
    console.log(goal, 'deleted goal');

    return NextResponse.json({ success: "Goal deleted successfully", goal }, { status: 400 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
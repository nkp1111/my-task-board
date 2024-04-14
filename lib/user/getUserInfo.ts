import { dbConnect } from "@/config/mongoose-client";
import { getUserFormattedData } from "../format/user";
import getJwtUser from "../auth/getJwtUser";

export const getUser = async () => {
  try {
    const connection = await dbConnect();
    if (!connection) {
      throw new Error("Couldn't connect to mongo database")
    }

    const user = await getJwtUser();
    if (user) {
      return { user: getUserFormattedData(user) }
    }

    return { error: "User not found" }
  } catch (error) {
    return { error, status: 400 }
  }
}
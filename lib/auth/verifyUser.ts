import { User } from "@/models/users";
import { verifyPassword } from "./passwordOp";
import { dbConnect } from "@/config/mongoose-client";
import { getUserFormattedData } from "../format/user";


export const verifyUser = async (userInfo: UserTypeWithPasswordSchema) => {
  try {
    const connection = await dbConnect();
    if (!connection) {
      throw new Error("Couldn't connect to mongo database")
    }

    const { username, password } = userInfo;
    if (!username || !password) {
      return {
        error: "username, password are required",
        status: 400,
      }
    }

    const user = await User.findOne({ username });
    if (!user) {
      return {
        error: "Username or password is not correct",
        status: 400,
      }
    }

    // if password match
    const passwordMatch = await verifyPassword(String(password), user.password);
    if (!passwordMatch) {
      return {
        error: "Username or password is not correct",
        status: 400,
      }
    }

    user.password = "hidden";
    return { user: getUserFormattedData(user), status: 200 }
  } catch (error) {
    return { error, status: 400 }
  }
}
import { User } from "@/models/users";
import { hashPassword } from "./passwordOp";
import { dbConnect } from "@/config/mongoose-client";


export const createUser = async (userInfo: UserTypeSchema) => {
  try {
    const connection = await dbConnect();
    if (!connection) {
      throw new Error("Couldn't connect to mongo database")
    }

    const { username, password, confirmPassword, firstName, lastName, bio, email } = userInfo;
    if (!username || !password || !confirmPassword) {
      return {
        error: "username, password and confirmPassword are all required",
        status: 400,
      }
    }

    const userExist = await User.findOne({ username });
    if (userExist) {
      return {
        error: "User with that email already exists",
        status: 400,
      }
    }

    if (password !== confirmPassword) {
      return {
        error: "Password does not match",
        status: 400,
      }
    }

    // hash password 
    const hashedPassword = await hashPassword(String(password));
    const user = await User.create({ ...userInfo, password: hashedPassword });
    user.password = "hidden";
    return { user, status: 200 }
  } catch (error) {
    return { error, status: 400 }
  }
}
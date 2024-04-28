import { User } from "@/models/users";
import { hashPassword } from "./passwordOp";
import { dbConnect } from "@/config/mongoose-client";
import { getUserFormattedData } from "../format/user";
import { UserValidationSchema } from "@/lib/general/validation";
import { validationErrorMessage } from "../format/validation-error-msg";

export const createUser = async (userInfo: UserTypeWithPasswordSchema) => {
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
        error: "User with that username already exists",
        status: 400,
      }
    }

    if (!password || password !== confirmPassword) {
      return {
        error: "Password does not match",
        status: 400,
      }
    }

    // hash password 
    const hashedPassword = await hashPassword(String(password));

    // validate user info
    let userInfoToSave = { ...userInfo, password: hashedPassword };
    const { success, data, error } = UserValidationSchema.safeParse(userInfoToSave);
    if (!success) return { error: validationErrorMessage(error) };

    const user = await User.create(userInfoToSave);
    return { user: getUserFormattedData(user), status: 200 }
  } catch (error) {
    return { error, status: 400 }
  }
}
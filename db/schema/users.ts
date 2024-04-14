import { Schema, models, model } from "mongoose";
import { hash, compare } from "bcrypt";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  avatar: {
    type: String,
  },
  status: {
    type: String,
  },
});

// hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await hash(this.password, 10);
})

// compare password
UserSchema.methods.comparePassword = async function (password: string) {
  return await compare(password, this.password);
}


const User = models.User || model("User", UserSchema);

export { User } 
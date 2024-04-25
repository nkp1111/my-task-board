import { Schema, models, model } from "mongoose";

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
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
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
}, {
  timestamps: true
});

// // hash password before saving
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) next();
//   this.password = 
// })

// // compare password
// UserSchema.methods.comparePassword = async function (password: string) {
//   return await compare(password, this.password);
// }


const User = models.User || model("User", UserSchema);

export { User } 
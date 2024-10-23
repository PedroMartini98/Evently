import { clerkClient } from "@clerk/nextjs/server";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;

// Ok tem que descobrir como cobrar first name e last name no clerkClient
//  e ver se da pra criar conta sem o google e ver se isso reslvo pra criar order

import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";
const { NextResponse } = require("next/server");

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  console.log({ name, email, password });
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // console.log(data);
    await connectToDB();
    console.log("database connected");

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log("user registered successfully", newUser);

    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch (error) {
    console.error("registeration error", error);
    return NextResponse.json({ message: "fail to register" }, { status: 500 });
  }
};

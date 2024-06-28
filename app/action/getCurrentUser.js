import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import User from "../../models/user";

export async function getSession() {
  return await getServerSession(options);
}

export default async function getCurrentUser() {
  try {
    // await User.createIndex({ email: 1 });

    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await User.findOne({ email: session?.user?.email });
    if (!currentUser) {
      return null;
    }
    const plainUser = currentUser.toObject();

    // Remove or serialize the properties that are not supported
    const { _id, password, __v, ...cleanUser } = plainUser;
    cleanUser.id = _id.toString(); // Convert _id to a string

    return cleanUser;
  } catch (error) {
    console.log(error);
  }
}

import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/database";
import Listing from "../../../models/listing";
import getCurrentUser from "../../action/getCurrentUser";
import mongoose, { Types } from "mongoose";

export async function POST(request) {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  if(!currentUser){
    return NextResponse.error();
  }

  const body = await request.json();
  console.log("received data",body);

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount, 
    guestCount,
    location,
    price,
  } = body;

  try {
    await connectToDB();
    const newListing = new Listing({
      id: currentUser.id,
      title, 
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount, 
      guestCount,
      location,
      price,
      user: {
        id: new mongoose.Types.ObjectId(currentUser?.id),
        name: currentUser?.name,
        email: currentUser?.email,
      }
    
    });
    await newListing.save();
    const serializedListing = newListing.toObject({getters: true});
    console.log(serializedListing);
    return new Response(JSON.stringify({ message: 'Listing created successfully', listing: serializedListing }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    
    return new Response(JSON.stringify({ message: 'Creating listing failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


// function serializeData(data) {
//   if (data == null) {
//     return data;
//   }

//   if (Array.isArray(data)) {
//     return data.map(serializeData);
//   }

//   if (typeof data === "object") {
//     if (data instanceof Types.ObjectId) {
//       return data.toString();
//     }

//     if (data instanceof Date) {
//       return data.toISOString();
//     }

//     const result = {};
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         result[key] = serializeData(data[key]);
//       }
//     }
//     return result;
//   }

//   return data;
// }
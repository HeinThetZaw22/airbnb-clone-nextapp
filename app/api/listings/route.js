import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/database";
import Listing from "../../../models/listing";
import getCurrentUser from "../../action/getCurrentUser";

export async function POST(request) {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    return NextResponse.error();
  }

  const body = await request.json();
  console.log("received data",body);

  const {title, description,
    imageSrc,
    category,
    roomCount,
    bathroomCount, 
    guestCount,
    location,
    price,
  } = body;
  
  if (!location || !location.value) {
    return new Response(JSON.stringify({ message: 'Location value is missing' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await connectToDB();
    const newListing = new Listing({
      title, 
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount, 
      guestCount,
      location,
      price,
      userId: currentUser._id,
    
    });
    await newListing.save();
    // const plainObject = JSON.parse(JSON.stringify(newListing));
    const serializedListing = newListing.toObject({getters: true});
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
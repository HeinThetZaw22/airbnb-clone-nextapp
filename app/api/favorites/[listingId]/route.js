import { NextResponse } from 'next/server';
import getCurrentUser from '../../../action/getCurrentUser';
import { connectToDB } from '../../../../lib/database';
import User from '../../../../models/user';

export async function POST(request, { params }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid Id");
    }


    // Update User's favoriteIds
    let userFavoriteIds = [...(currentUser.favoriteIds || [])];
    if (!userFavoriteIds.includes(listingId)) {
        userFavoriteIds.push(listingId);
    }

    await connectToDB();

    const updatedUser = await User.findByIdAndUpdate(currentUser.id, {
        favoriteIds: userFavoriteIds
    }, { new: true });

    if (!updatedUser) {
        return NextResponse.json({
            error: "Update failed"
        }, { status: 500 });
    }

    console.log("POST: update id", updatedUser.favoriteIds);

    return NextResponse.json({
        user: updatedUser,
    });
}



export async function DELETE(request, { params }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid Id");
    }

    // console.log('Current User:', currentUser);
    // console.log('Listing ID:', listingId);

    // let userFavoriteIds = [...(currentUser.favoriteIds || [])];
    // console.log("current fav id", userFavoriteIds);

    // currentUser.favoriteIds = currentUser.favoriteIds.filter(id=> id!== listingId);
    // await connectToDB();

    // userFavoriteIds = userFavoriteIds.filter(id => id !== listingId);
    // console.log("updated fav ids", userFavoriteIds);

    // const updatedUser = await User.findByIdAndUpdate(currentUser.id, currentUser, { new: true });


    const filteredFavoriteIds = currentUser.favoriteIds.filter(id => id !== listingId);

    await connectToDB();
  
    const updatedUser = await User.findByIdAndUpdate(currentUser.id, {
      favoriteIds: filteredFavoriteIds
    }, { new: true });

    if (!updatedUser) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    console.log("DELETE: updated ids", updatedUser.favoriteIds);

    return NextResponse.json({ user: updatedUser });
}
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

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    if (!favoriteIds.includes(listingId)) {
        favoriteIds.push(listingId);
    }

    await connectToDB();

    const user = await User.findByIdAndUpdate(currentUser.id, {
        favoriteIds
    });

    if (!user) {
        return NextResponse.json({
            error: "Update failed"
        }, { status: 500 });
    }

    return NextResponse.json({
        user
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

    // let favoriteIds = [...(currentUser.favoriteIds || [])];
    // favoriteIds = favoriteIds.filter((id) => id !== listingId);
    // await connectToDB();

    // const user = await User.findByIdAndUpdate(currentUser.id, favoriteIds, {new: true});

    // if (!user) {
    //     return NextResponse.json({ error: "Update failed" }, { status: 500 });
    // }

    // console.log("current.id", currentUser.id);
    await connectToDB();
    const user = await User.findOne({id: currentUser.id});
    console.log("user", user);
    const updatedFavoriteIds = user.favoriteIds.filter((id) => id !== listingId);
    user.favoriteIds = updatedFavoriteIds;
    await user.save();
    // await User.updateOne({_id: currentUser._id}, {$set: {favoriteIds: updatedFavoriteIds}});

    return NextResponse.json({ message: "Listing deleted from favorites"});
}
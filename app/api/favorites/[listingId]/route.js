import { NextResponse } from 'next/server';
import getCurrentUser from '../../../action/getCurrentUser';
import { connectToDB } from '../../../../lib/database';
import User from '../../../../models/user';


export async function POST(request, {params}) {
    const currentUser = await getCurrentUser(); 
    if(!currentUser){
        return NextResponse.error();
    }
    const {listingId} = params;
    if(!listingId || typeof listingId !== 'string'){
        throw new Error("Invalid Id");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);

    await connectToDB();
    const user = await User.findByIdAndUpdate(currentUser.id, {
        favoriteIds
    }, {new : true});

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);

}

export async function DELETE(request, {params}) {
    const currentUser = await getCurrentUser(); 
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid Id");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter(id => id !== listingId);

    await connectToDB();

    const updatedUser = await User.findByIdAndUpdate(currentUser.id, {
        favoriteIds
    }, { new: true });

    if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });    }

    return NextResponse.json(updatedUser);
}
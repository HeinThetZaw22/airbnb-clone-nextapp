import { NextResponse } from 'next/server';
import getCurrentUser from '../../../action/getCurrentUser'
import { connectToDB } from '../../../../lib/database';
import Listing from '../../../../models/listing';

export async function DELETE(req,{params}) {
    // console.log(req);
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.error();
    }
    const {listingId} = params;
    if(!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid Id");
    }

    await connectToDB();
    const listing = await Listing.deleteOne({
        _id: listingId,
        "user.id": currentUser.id
    })

    if(listing.deletedCount === 0) {
        return NextResponse.json({message: "Listing not found"}, {status: 404});
    }

    return NextResponse.json({message: "Listing deleted successfully"});
}
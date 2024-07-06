import {connectToDB} from '../../lib/database'
import Listing from '../../models/listing'
export default async function getProperties({userId}) {
    // const {userId} = params;
    try {
       
        await connectToDB();
        const listings = await Listing.find({"user.id": userId}).sort({ createdAt: -1 });

        return listings;
    } catch (error) {
        throw new Error(error);
    }

}
import { connectToDB } from '../../lib/database';
import Listing from '../../models/listing';

export default async function getListings(){
    try {
        //when you try to access model before database connection, buffer error occur
        await connectToDB();
        const listings = await Listing.find().sort({ createdAt: -1 });

        return listings;
    } catch (error) {
        throw new Error(error);
    }
}
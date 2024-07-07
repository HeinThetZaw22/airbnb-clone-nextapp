import { connectToDB } from '../../lib/database';
import Listing from '../../models/listing';

export default async function getFilterListings({params}){
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            category
        } = params;
        let query = [];
        if(userId){
            query.userId = userId;
        }
        if(category) {
            query.category = category
        }
        if(guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        if(roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }
        if(bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }
        if(locationValue) {
            query.locationValue = locationValue
        }
        //dataRange handle

         //when you try to access model before database connection, buffer error occur
        await connectToDB();
        const listings = await Listing.find(query).sort({ createdAt: -1 });

        return listings;
    } catch (error) {
        throw new Error(error);
    }
}
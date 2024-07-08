import { connectToDB } from '../../lib/database';
import Listing from '../../models/listing';

export default async function getListings({params} = {}){
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            category,
            locationValue
        } = params || {};
        let query = {};
        if(userId){
            query.userId = userId;
        }
        if(category) {
            query.category = category
        }
        if(guestCount) {
            query.guestCount = {
                $gte: parseInt(guestCount, 10)
            }
        }
        if(roomCount) {
            query.roomCount = {
                $gte: parseInt(roomCount, 10)
            }
        }
        if(bathroomCount) {
            query.bathroomCount = {
                $gte: parseInt(bathroomCount, 10)
            }
        }
        if(locationValue) {
            query['location.value'] = locationValue
        }
        //dataRange handle

         //when you try to access model before database connection, buffer error occur
        await connectToDB();
        const listings = await Listing.find(query).sort({ createdAt: -1 });

        return listings;
    } catch (error) {
        throw new Error(error.message);
    }
}
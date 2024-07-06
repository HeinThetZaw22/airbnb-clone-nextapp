import { connectToDB } from '../../lib/database';
import getCurrentUser from '../action/getCurrentUser'
import Listing from '../../models/listing'
export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return [];
        }

        await connectToDB();
        const favorites = await Listing.find({_id: {$in: currentUser.favoriteIds}});
        return favorites;
    } catch (error) {
        throw new Error(error);
    }
}
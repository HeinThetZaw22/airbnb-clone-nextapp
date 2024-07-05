import { connectToDB } from '../../lib/database';
import Listing from '../../models/listing';
import Reservation from '../../models/reservation'

export default async function getReservationWithListing(params) {
    try {
        const { listingId, userId, authorId } = params;
        const query = {};

        //all reservations for each listing
        if (listingId) {
            query.listingId = listingId;
        }

        //all trips the user have
        if (userId) {
            query.userId = userId;
        }

        // All reservations made for the user's listings
        if (authorId) {
            await connectToDB();
            // Fetch all listings owned by the current user (authorId)
            const listingsOwnedByAuthor = await Listing.find({ 'user.id': authorId }).select('_id');
            const listingIds = listingsOwnedByAuthor.map(listing => listing._id);

            if (listingIds.length > 0) {
                query.listingId = { $in: listingIds };
            } else {
                return [];
            }
        }

        await connectToDB();
        const reservations = await Reservation.find(query).populate('listingId');

        return reservations;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
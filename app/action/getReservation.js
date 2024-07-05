import {connectToDB} from '../../lib/database';
import Reservation from '../../models/reservation'

export default async function getReservation(params) {
    try {
        const {listingId, userId, authorId} = params;
    const query = {};

    //all reservations for each listing
    if(listingId){
        query.listingId = listingId;
    }

    //all trips the user have
    if(userId) {
        query.userId = userId;
    }

    //all reservations that other users made for our propetry
    if(authorId) {
        query.listing = {userId: authorId};
    }

    await connectToDB();
    const reservations = await Reservation.find(query).sort({ createdAt: -1 });

    return reservations;
    } catch (error) {
        throw new Error(error);
    }


}
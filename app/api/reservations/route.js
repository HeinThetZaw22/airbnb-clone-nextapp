import { NextResponse } from 'next/server';
import getCurrentUser from '../../action/getCurrentUser'
import { connectToDB } from '../../../lib/database';
import Reservation from '../../../models/reservation';

export async function POST(request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error({ status: 401, statusText: 'Unauthorized' });
    }

    const body = await request.json();
    console.log("received data", body);
    const { listingId, startDate, endDate, totalPrice } = body;

    try {
        await connectToDB();
        const newReservation = new Reservation({
            userId: currentUser.id,
            listingId,
            startDate,
            endDate,
            totalPrice,
        });
        console.log(newReservation);
        await newReservation.save();
        return NextResponse.json(newReservation, { status: 201 })
    } catch (error) {
        console.error('reservation error:', error);
    
    return new Response(JSON.stringify({ message: 'Reservation failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
    }
}
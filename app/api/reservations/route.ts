import { create } from 'zustand';
import getCurrentUser from '@/app/action/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ status: 401, statusText: 'Unauthorized' });
    }

    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } = body;

    if(!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }
   const listingAndRservation = await prisma.listing.update({
    where: {
        id: listingId
    },
    data: {
        reservations: {
            create: {
                userId: currentUser.id,
                startDate,
                endDate,
                totalPrice,
            }
        }
    }
   });

   return NextResponse.json(listingAndRservation);
}
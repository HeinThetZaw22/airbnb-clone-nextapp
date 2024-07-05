import { NextResponse } from "next/server";
import {connectToDB} from '../../../../lib/database';
import Reservation from '../../../../models/reservation';
import getCurrentUser from '../../../action/getCurrentUser';

export async function DELETE(req, { params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ success: false, message: "User not authenticated" });
  }

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== 'string') {
    return NextResponse.json({ success: false, message: "Invalid Id" });
  }

  await connectToDB();

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
    if (!deletedReservation) {
      return NextResponse.json({ success: false, message: "Reservation not found" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "An error occurred" });
  }
}

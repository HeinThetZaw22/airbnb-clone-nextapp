import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({
      status: 401,
      message: "User not authenticated",
    });
  }

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") {
    return NextResponse.json({ message: "Invalid Id" });
  }

  try {
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          //for user who make reservation
          { userId: currentUser.id },
          //for creater who own
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.error();
  }
}

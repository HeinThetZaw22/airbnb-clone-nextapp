import bcrypt from "bcryptjs";
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST (
  request: Request
) {
  const body = await request.json();
  const { 
    name, 
    email, 
    password
   } = body;
  // console.log({ name, email, password });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  });

  return NextResponse.json(user);
};

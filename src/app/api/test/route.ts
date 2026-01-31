import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/shared/lib/mongodb';

export async function GET() {
  await dbConnect();

  return NextResponse.json({
    ok: true,
    readyState: mongoose.connection.readyState,
    dbName: mongoose.connection.name,
  });
}

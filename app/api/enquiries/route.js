import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

// 1. GET: Jab bhi dashboard open hoga, yeh function database se saari enquiries nikal kar layega.
export async function GET() {
  try {
    await dbConnect(); // Database se connect karo
    const enquiries = await Enquiry.find({}); // Saari enquiries fetch karo
    return NextResponse.json({ success: true, data: enquiries }, { status: 200 });
  } catch (error) {
    console.error('MONGO_GET_ERROR:', error); // <-- Yeh terminal par exact error dikhayega
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. POST: Jab koi nayi enquiry aayegi, yeh function usko database mein save karega.
export async function POST(request) {
  try {
    await dbConnect(); // Database se connect karo
    const body = await request.json(); // Jo data aaya hai usko read karo
    const newEnquiry = await Enquiry.create(body); // Database mein naya record banao
    return NextResponse.json({ success: true, data: newEnquiry }, { status: 201 });
  } catch (error) {
    console.error('MONGO_POST_ERROR:', error); // <-- Yeh terminal par exact error dikhayega
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
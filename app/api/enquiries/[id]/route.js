import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

// PUT: Status update karne ke liye
export async function PUT(request, context) {
  try {
    await dbConnect();
    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    // Hum yahan { id: id } se search kar rahe hain taaki LEAD-XXXX match ho sake
    const updatedEnquiry = await Enquiry.findOneAndUpdate(
      { id: id },
      body,
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedEnquiry }, { status: 200 });
  } catch (error) {
    console.error('MONGO_PUT_ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Database se permanent delete karne ke liye
export async function DELETE(request, context) {
  try {
    await dbConnect();
    const params = await context.params;
    const { id } = params;

    const deletedEnquiry = await Enquiry.findOneAndDelete({ id: id });

    if (!deletedEnquiry) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Permanently deleted from database' }, { status: 200 });
  } catch (error) {
    console.error('MONGO_DELETE_ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  destination: { type: String, required: true },
  guests: { type: String, required: true },
  notes: { type: String },
  status: { type: String, default: 'Pending Review' },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
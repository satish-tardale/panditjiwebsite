import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmypandit_dummy';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    // If no real URI is provided, we'll log a warning but allow the app to run with mock logic
    if (!process.env.MONGODB_URI) {
      console.warn("⚠️ MONGODB_URI not found. Running in mock mode.");
      return;
    }
    await mongoose.connect(MONGODB_URI);
    console.log('🚀 MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
};

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'pandit', 'admin'], default: 'user' },
}, { timestamps: true });

// Pandit Schema
const PanditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bio: String,
  experience: Number,
  languages: [String],
  area: [String],
  rating: { type: Number, default: 5 },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  availabilitySlots: [Date],
  servicesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Puja' }]
});

// Puja Schema
const PujaSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  basePrice: Number,
  pricingTiers: {
    silver: Number,
    gold: Number,
    royal: Number
  }
});

// Booking Schema
const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  panditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pandit' },
  pujaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Puja' },
  area: String,
  date: Date,
  time: String,
  address: String,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  bookingStatus: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
  transactionId: String
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Pandit = mongoose.models.Pandit || mongoose.model('Pandit', PanditSchema);
export const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);
export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

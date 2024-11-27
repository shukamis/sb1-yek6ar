import mongoose from 'mongoose';

const RelationshipSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  partnerId: String,
  startDate: {
    type: Date,
    required: true,
  },
  photos: [{
    type: String,
    default: [],
  }],
  monthlyReminder: {
    type: Boolean,
    default: true,
  },
  lastChecked: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Relationship = mongoose.models.Relationship || mongoose.model('Relationship', RelationshipSchema);
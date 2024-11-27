import mongoose from 'mongoose';

const DateIdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['romantic', 'adventure', 'casual', 'intimate'],
    required: true,
  },
  premiumOnly: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const DateIdea = mongoose.models.DateIdea || mongoose.model('DateIdea', DateIdeaSchema);
import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      required: true,
      enum: ['Running', 'Cycling', 'Walking', 'Gym Workout'],
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    distance: {
      type: Number,
      min: 0,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
workoutSchema.index({ userId: 1, date: -1 });

export default mongoose.model('Workout', workoutSchema);


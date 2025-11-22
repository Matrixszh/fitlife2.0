import express from 'express';
import Workout from '../models/Workout.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all workouts for a user
router.get('/', protect, async (req, res) => {
  try {
    const { activityType, minDuration, maxDuration, startDate, endDate } = req.query;

    // Build query
    const query = { userId: req.user._id };

    if (activityType) {
      query.activityType = activityType;
    }

    if (minDuration !== undefined) {
      query.duration = { ...query.duration, $gte: Number(minDuration) };
    }

    if (maxDuration !== undefined) {
      query.duration = { ...query.duration, $lte: Number(maxDuration) };
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const workouts = await Workout.find(query)
      .sort({ date: -1 })
      .lean();

    // Convert MongoDB documents to frontend format
    const formattedWorkouts = workouts.map((workout) => ({
      id: workout._id.toString(),
      userId: workout.userId.toString(),
      activityType: workout.activityType,
      duration: workout.duration,
      distance: workout.distance,
      calories: workout.calories,
      date: workout.date,
      notes: workout.notes,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
    }));

    res.json(formattedWorkouts);
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add workout
router.post('/', protect, async (req, res) => {
  try {
    const { activityType, duration, distance, calories, date, notes } = req.body;

    const workout = await Workout.create({
      userId: req.user._id,
      activityType,
      duration,
      distance,
      calories,
      date: new Date(date),
      notes,
    });

    res.status(201).json({
      id: workout._id.toString(),
      userId: workout.userId.toString(),
      activityType: workout.activityType,
      duration: workout.duration,
      distance: workout.distance,
      calories: workout.calories,
      date: workout.date,
      notes: workout.notes,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
    });
  } catch (error) {
    console.error('Add workout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update workout
router.put('/:id', protect, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if workout belongs to user
    if (workout.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { activityType, duration, distance, calories, date, notes } = req.body;

    workout.activityType = activityType || workout.activityType;
    workout.duration = duration !== undefined ? duration : workout.duration;
    workout.distance = distance !== undefined ? distance : workout.distance;
    workout.calories = calories !== undefined ? calories : workout.calories;
    workout.date = date ? new Date(date) : workout.date;
    workout.notes = notes !== undefined ? notes : workout.notes;

    const updatedWorkout = await workout.save();

    res.json({
      id: updatedWorkout._id.toString(),
      userId: updatedWorkout.userId.toString(),
      activityType: updatedWorkout.activityType,
      duration: updatedWorkout.duration,
      distance: updatedWorkout.distance,
      calories: updatedWorkout.calories,
      date: updatedWorkout.date,
      notes: updatedWorkout.notes,
      createdAt: updatedWorkout.createdAt,
      updatedAt: updatedWorkout.updatedAt,
    });
  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete workout
router.delete('/:id', protect, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if workout belongs to user
    if (workout.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Workout.findByIdAndDelete(req.params.id);

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;


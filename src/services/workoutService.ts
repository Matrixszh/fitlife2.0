import { apiRequest } from '../config/api';
import type { Workout, WorkoutFormData, WorkoutFilters, ActivityType } from '../types';

export const addWorkout = async (userId: string, workoutData: WorkoutFormData): Promise<string> => {
  const response = await apiRequest('/workouts', {
    method: 'POST',
    body: JSON.stringify(workoutData),
  });

  const data = await response.json();
  return data.id;
};

export const updateWorkout = async (
  workoutId: string,
  workoutData: WorkoutFormData
): Promise<void> => {
  await apiRequest(`/workouts/${workoutId}`, {
    method: 'PUT',
    body: JSON.stringify(workoutData),
  });
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
  await apiRequest(`/workouts/${workoutId}`, {
    method: 'DELETE',
  });
};

export const getWorkouts = async (
  userId: string,
  filters?: WorkoutFilters
): Promise<Workout[]> => {
  const params = new URLSearchParams();
  
  if (filters?.activityType) {
    params.append('activityType', filters.activityType);
  }
  if (filters?.minDuration !== undefined) {
    params.append('minDuration', filters.minDuration.toString());
  }
  if (filters?.maxDuration !== undefined) {
    params.append('maxDuration', filters.maxDuration.toString());
  }
  if (filters?.startDate) {
    params.append('startDate', filters.startDate);
  }
  if (filters?.endDate) {
    params.append('endDate', filters.endDate);
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/workouts?${queryString}` : '/workouts';

  const response = await apiRequest(endpoint);
  const data = await response.json();

  return data.map((workout: any) => ({
    id: workout.id,
    userId: workout.userId,
    activityType: workout.activityType,
    duration: workout.duration,
    distance: workout.distance,
    calories: workout.calories,
    date: new Date(workout.date),
    notes: workout.notes,
    createdAt: new Date(workout.createdAt),
    updatedAt: new Date(workout.updatedAt),
  }));
};

export const getWorkoutStats = async (_userId: string, workouts: Workout[]) => {
  const stats = {
    totalWorkouts: workouts.length,
    totalCalories: workouts.reduce((sum, w) => sum + w.calories, 0),
    totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
    totalDistance: workouts.reduce((sum, w) => sum + (w.distance || 0), 0),
    workoutsByType: {
      Running: 0,
      Cycling: 0,
      Walking: 0,
      'Gym Workout': 0,
    } as Record<ActivityType, number>,
    recentWorkouts: workouts.slice(0, 5),
  };

  workouts.forEach((workout) => {
    stats.workoutsByType[workout.activityType]++;
  });

  return stats;
};

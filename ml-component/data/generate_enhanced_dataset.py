"""
Generate enhanced workout_activities.arff dataset for WEKA
This script generates a larger, more realistic dataset with better patterns
"""

import random
import math

def generate_running_data(count=100):
    """Generate Running workout data with realistic patterns"""
    data = []
    for _ in range(count):
        duration = random.randint(15, 75)  # 15-75 minutes
        # Running speed: 8-12 km/h average
        speed = random.uniform(8.0, 12.0)
        distance = round((duration / 60.0) * speed, 1)  # Realistic distance based on speed
        # Calories: 60-100 calories per km for running (varies by intensity)
        base_calories = distance * random.uniform(60, 100)
        # Adjust for duration (longer runs burn more)
        calories = int(base_calories + (duration * random.uniform(2, 5)))
        data.append((duration, distance, calories, "Running"))
    return data

def generate_cycling_data(count=100):
    """Generate Cycling workout data with realistic patterns"""
    data = []
    for _ in range(count):
        duration = random.randint(20, 120)  # 20-120 minutes
        # Cycling speed: 15-25 km/h average
        speed = random.uniform(15.0, 25.0)
        distance = round((duration / 60.0) * speed, 1)  # Realistic distance
        # Calories: 20-40 calories per km for cycling
        base_calories = distance * random.uniform(20, 40)
        # Adjust for duration
        calories = int(base_calories + (duration * random.uniform(1, 3)))
        data.append((duration, distance, calories, "Cycling"))
    return data

def generate_walking_data(count=100):
    """Generate Walking workout data with realistic patterns"""
    data = []
    for _ in range(count):
        duration = random.randint(20, 90)  # 20-90 minutes
        # Walking speed: 4-6 km/h average
        speed = random.uniform(4.0, 6.5)
        distance = round((duration / 60.0) * speed, 1)  # Realistic distance
        # Calories: 30-50 calories per km for walking
        base_calories = distance * random.uniform(30, 50)
        # Adjust for duration
        calories = int(base_calories + (duration * random.uniform(1, 2)))
        data.append((duration, distance, calories, "Walking"))
    return data

def generate_gym_workout_data(count=100):
    """Generate Gym Workout data with realistic patterns"""
    data = []
    for _ in range(count):
        duration = random.randint(30, 120)  # 30-120 minutes
        distance = 0.0  # No distance for gym workouts
        # Calories: Based on duration and intensity
        # Gym workouts: 5-10 calories per minute depending on intensity
        intensity = random.uniform(5.0, 10.0)
        calories = int(duration * intensity)
        # Ensure reasonable range
        calories = max(200, min(800, calories))
        data.append((duration, distance, calories, "Gym_Workout"))
    return data

def generate_arff_file(filename="workout_activities.arff", total_rows=400):
    """Generate ARFF file with enhanced workout data"""
    
    # Calculate rows per activity type (balanced distribution)
    rows_per_type = total_rows // 4
    
    # Generate data for each activity type
    all_data = []
    all_data.extend(generate_running_data(rows_per_type))
    all_data.extend(generate_cycling_data(rows_per_type))
    all_data.extend(generate_walking_data(rows_per_type))
    all_data.extend(generate_gym_workout_data(rows_per_type))
    
    # Shuffle the data for better training
    random.shuffle(all_data)
    
    # Write ARFF file
    with open(filename, 'w') as f:
        # Write header
        f.write("@relation workout_activities\n\n")
        f.write("@attribute duration numeric\n")
        f.write("@attribute distance numeric\n")
        f.write("@attribute calories numeric\n")
        f.write("@attribute activityType {Running,Cycling,Walking,Gym_Workout}\n\n")
        f.write("@data\n")
        
        # Write data
        for duration, distance, calories, activity_type in all_data:
            f.write(f"{duration},{distance},{calories},{activity_type}\n")
    
    # Print statistics
    running_count = sum(1 for d in all_data if d[3] == 'Running')
    cycling_count = sum(1 for d in all_data if d[3] == 'Cycling')
    walking_count = sum(1 for d in all_data if d[3] == 'Walking')
    gym_count = sum(1 for d in all_data if d[3] == 'Gym_Workout')
    
    print(f"✓ Generated {filename} with {len(all_data)} rows")
    print(f"  - Running: {running_count} rows")
    print(f"  - Cycling: {cycling_count} rows")
    print(f"  - Walking: {walking_count} rows")
    print(f"  - Gym_Workout: {gym_count} rows")
    print(f"\nDataset is balanced and ready for training!")

if __name__ == "__main__":
    import sys
    
    # Set random seed for reproducibility (but different from original)
    random.seed(123)
    
    # Get number of rows from command line or use default
    num_rows = 400  # Increased default for better accuracy
    if len(sys.argv) > 1:
        try:
            num_rows = int(sys.argv[1])
            if num_rows < 100:
                print("Warning: Minimum 100 rows recommended for good model performance")
            if num_rows % 4 != 0:
                print(f"Warning: {num_rows} is not divisible by 4. Using {num_rows - (num_rows % 4)} rows for balanced distribution.")
                num_rows = num_rows - (num_rows % 4)
        except ValueError:
            print("Invalid number of rows. Using default: 400")
    
    generate_arff_file("workout_activities.arff", num_rows)
    print("\n✓ Enhanced dataset generated successfully!")
    print("\nNext steps:")
    print("1. Train the model:")
    print("   mvn compile exec:java '-Dexec.mainClass=com.fitlife.ml.ActivityClassifier' '-Dexec.args=data/workout_activities.arff'")
    print("2. Start the ML server:")
    print("   mvn exec:java '-Dexec.mainClass=com.fitlife.ml.MLServer' '-Dexec.args=models/activity_classifier.model data/workout_activities.arff'")



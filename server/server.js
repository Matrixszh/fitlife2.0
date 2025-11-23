import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (works even without DB connection)
app.get('/api/health', (req, res) => {
  res.json({ message: 'FitLife API is running!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server only after MongoDB connection is established
const startServer = async () => {
  try {
    // Wait for MongoDB connection before starting server
    await connectDB();
    
    // Start server after successful connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();


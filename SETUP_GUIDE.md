# FitLife Setup Guide - MongoDB Atlas Version

This guide will help you set up the FitLife application with MongoDB Atlas backend.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier is fine)
- A code editor (VS Code recommended)

## Quick Start

### 1. MongoDB Atlas Setup

Follow the detailed guide in [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md) to:
- Create a MongoDB Atlas account
- Set up a cluster
- Get your connection string

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file with your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fitlife?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
   PORT=5000
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   Server running on port 5000
   MongoDB Atlas Connected: cluster0-shard-00-00.xxxxx.mongodb.net:27017
   ```

### 3. Frontend Setup

1. In a new terminal, navigate to the project root:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (optional):
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

   Note: If you don't create this file, it will default to `http://localhost:5000/api`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
fitlife/
├── server/                 # Backend (Express + MongoDB)
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js        # User model
│   │   └── Workout.js     # Workout model
│   ├── routes/
│   │   ├── authRoutes.js  # Authentication routes
│   │   └── workoutRoutes.js # Workout routes
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── server.js          # Express server entry point
│   └── package.json
├── src/                    # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── Auth/          # Login & Register components
│   │   ├── Dashboard/     # Dashboard components
│   │   ├── Layout/        # Sidebar component
│   │   ├── Profile/       # Profile component
│   │   └── Workout/       # Workout components
│   ├── contexts/
│   │   └── AuthContext.tsx # Authentication context
│   ├── services/
│   │   ├── authService.ts # Authentication API calls
│   │   └── workoutService.ts # Workout API calls
│   ├── config/
│   │   └── api.ts         # API configuration
│   └── App.tsx            # Main app component
└── package.json
```

## Features

### 🎨 New UI Design
- **Bold Dark Theme**: Modern dark theme with neon accents
- **Sidebar Navigation**: Fixed sidebar with smooth transitions
- **Gradient Accents**: Beautiful gradient colors (Cyan to Green)
- **Bold Typography**: Heavy font weights for better readability
- **Glass Morphism**: Modern frosted glass effects

### 🗄️ Backend Features
- **MongoDB Atlas**: Cloud database with free tier
- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Clean API structure
- **Password Hashing**: Bcrypt for secure password storage

### 📱 Frontend Features
- **React + TypeScript**: Type-safe React application
- **Context API**: Global state management
- **Responsive Design**: Works on all screen sizes
- **Modern UI Components**: Beautiful, bold design

## Environment Variables

### Backend (.env in server/)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Frontend (.env in root - optional)
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd server
   npm start
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:id` - Get user profile

### Workouts
- `GET /api/workouts` - Get all workouts (requires auth)
- `POST /api/workouts` - Create workout (requires auth)
- `PUT /api/workouts/:id` - Update workout (requires auth)
- `DELETE /api/workouts/:id` - Delete workout (requires auth)

## Troubleshooting

### Backend Issues

**Connection Failed:**
- Check your MongoDB Atlas connection string
- Verify your IP is whitelisted in MongoDB Atlas
- Ensure the cluster is running (not paused)

**Port Already in Use:**
- Change PORT in `.env` file
- Or kill the process using port 5000

### Frontend Issues

**API Calls Failing:**
- Ensure backend server is running
- Check `VITE_API_URL` in `.env`
- Check browser console for CORS errors

**Authentication Not Working:**
- Verify JWT_SECRET is set in backend `.env`
- Clear browser localStorage and try again
- Check backend logs for errors

## Production Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Use a strong JWT_SECRET
3. Update MONGODB_URI with production connection string
4. Set proper CORS origins

### Frontend Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Update `VITE_API_URL` to production API URL
3. Deploy the `dist` folder to your hosting platform

## Support

For issues or questions:
1. Check the [MongoDB Atlas Setup Guide](./MONGODB_ATLAS_SETUP.md)
2. Review the troubleshooting section above
3. Check server logs for detailed error messages

## License

This project is for educational purposes.


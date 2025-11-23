import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI is not set in your .env file');
      console.error('📝 Please create a .env file in the server directory with:');
      console.error('   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fitlife?retryWrites=true&w=majority');
      process.exit(1);
    }

    // Connection options for better reliability
    const options = {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      console.error('\n🔧 Fix: Whitelist your IP address in MongoDB Atlas:');
      console.error('   1. Go to: https://cloud.mongodb.com/');
      console.error('   2. Navigate to: Security → Network Access');
      console.error('   3. Click "Add IP Address"');
      console.error('   4. For development, click "Allow Access from Anywhere" (0.0.0.0/0)');
      console.error('   5. Or add your current IP address');
      console.error('   6. Wait 1-2 minutes for changes to take effect');
    } else if (error.message.includes('authentication')) {
      console.error('\n🔧 Fix: Check your MongoDB credentials:');
      console.error('   1. Verify username and password in your .env file');
      console.error('   2. URL encode special characters in password (@ → %40, # → %23, etc.)');
      console.error('   3. Make sure there are no spaces in the connection string');
    } else {
      console.error('\n🔧 Troubleshooting:');
      console.error('   1. Check your internet connection');
      console.error('   2. Verify your MongoDB Atlas cluster is running');
      console.error('   3. Check your .env file has the correct MONGODB_URI');
    }
    
    process.exit(1);
  }
};

export default connectDB;


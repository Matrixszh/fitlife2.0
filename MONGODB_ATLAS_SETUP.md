# MongoDB Atlas Setup Guide

This guide will walk you through setting up MongoDB Atlas for your FitLife application.

## Step 1: Create a MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (if you don't have one)
3. Verify your email address

## Step 2: Create a New Cluster

1. After logging in, click **"Build a Database"** or **"Create"**
2. Choose the **FREE** (M0) tier
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure) and region
4. Click **"Create Cluster"**
5. Wait for the cluster to be created (this may take a few minutes)

## Step 3: Create Database User

1. In the **Security** section, click **"Database Access"**
2. Click **"Add New Database User"**zainhussaini9898_db_user
3. Choose **"Password"** as the authentication method
4. Enter a username and password (save these securely!)
5. Under **Database User Privileges**, select **"Atlas admin"** or **"Read and write to any database"**
6. Click **"Add User"**

## Step 4: Configure Network Access

1. In the **Security** section, click **"Network Access"**
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - **Note:** For production, restrict this to your server's IP address
4. Click **"Confirm"**

## Step 5: Get Connection String

1. Click **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver and **"3.6 or later"** as the version
5. Copy the connection string. It will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Configure Your Application

1. In the `server` directory, create a `.env` file (copy from `.env.example`):
   ```bash
   cp server/.env.example server/.env
   ```

2. Open `server/.env` and replace the connection string:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fitlife?retryWrites=true&w=majority
   ```

   Replace:
   - `YOUR_USERNAME` with your database username
   - `YOUR_PASSWORD` with your database password 
   - `cluster0.xxxxx` with your cluster address
   - `fitlife` is the database name (you can change this)

3. Set a strong JWT secret:
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
   ```

4. Set the server port (optional, defaults to 5000):
   ```
   PORT=5000
   ```

## Step 7: Install Server Dependencies

```bash
cd server
npm install
```

## Step 8: Start the Server

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

## Step 9: Verify Connection

1. Go back to MongoDB Atlas
2. Click **"Database"** → **"Browse Collections"**
3. Once you register or create data, you should see:
   - `users` collection
   - `workouts` collection

## Troubleshooting

### Connection Issues

- **Error: "Authentication failed"**
  - Double-check your username and password in the connection string
  - Make sure there are no special characters that need URL encoding

- **Error: "IP not whitelisted"**
  - Go to Network Access and add your IP address (or use 0.0.0.0/0 for development)

- **Error: "Server selection timed out"**
  - Check your internet connection
  - Verify the cluster is running (not paused)
  - Check if your firewall is blocking the connection

### Environment Variables

- Make sure `.env` file is in the `server` directory
- Never commit `.env` to git (it's already in `.gitignore`)
- Use different JWT secrets for development and production

## Next Steps

1. Test registration: Create an account through the app
2. Verify data: Check MongoDB Atlas to see if the user was created
3. Test workouts: Add a workout and verify it appears in the database

## Security Notes

- **Never commit** your `.env` file to version control
- Use **strong passwords** for database users
- In production, **restrict IP access** to your server's IP only
- Use **environment variables** for all sensitive data
- Regularly **update your JWT secret** in production

## Free Tier Limits

The MongoDB Atlas free tier (M0) includes:
- 512 MB storage
- Shared RAM and vCPU
- Sufficient for small to medium applications
- No credit card required

For production applications, consider upgrading to a paid tier.


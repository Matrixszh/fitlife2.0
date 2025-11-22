# Quick Start - Backend Server

## Common Issue: ERR_CONNECTION_REFUSED

If you're getting `ERR_CONNECTION_REFUSED`, the backend server isn't running. Follow these steps:

## Step 1: Verify .env File

Make sure your `server/.env` file has these variables:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fitlife?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
PORT=5000
```

**Important:**
- Replace `YOUR_USERNAME` with your MongoDB Atlas username
- Replace `YOUR_PASSWORD` with your MongoDB Atlas password (URL encode special characters!)
- Replace `cluster0.xxxxx` with your actual cluster address
- Make sure there are no spaces around the `=` sign

### URL Encoding Special Characters in Password

If your password has special characters, you need to URL encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `/` becomes `%2F`
- `&` becomes `%26`
- `?` becomes `%3F`

## Step 2: Install Dependencies (if not done)

```bash
cd server
npm install
```

## Step 3: Start the Server

### Option A: Production Mode
```bash
cd server
npm start
```

### Option B: Development Mode (with auto-reload)
```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Atlas Connected: cluster0-shard-00-00.xxxxx.mongodb.net:27017
```

## Step 4: Verify Server is Running

Open a browser or use curl:
```
http://localhost:5000/api/health
```

You should see:
```json
{"message":"FitLife API is running!"}
```

## Troubleshooting

### Server Crashes on Start

1. **Check MongoDB Connection String:**
   - Verify the connection string in `.env`
   - Make sure your IP is whitelisted in MongoDB Atlas
   - Test the connection string in MongoDB Compass

2. **Check for Port Conflicts:**
   - Port 5000 might be in use by another application
   - Change PORT in `.env` to another port (e.g., 5001)
   - Update frontend `.env` if you changed the port

3. **Check Node Version:**
   ```bash
   node --version
   ```
   Should be v16 or higher

4. **View Server Logs:**
   - Check the terminal where you started the server
   - Look for error messages
   - Common errors:
     - "Authentication failed" → Check username/password
     - "IP not whitelisted" → Add IP in MongoDB Atlas Network Access
     - "Server selection timed out" → Check internet connection

### Still Not Working?

1. Delete `node_modules` and reinstall:
   ```bash
   cd server
   rm -rf node_modules
   npm install
   ```

2. Check if MongoDB Atlas cluster is running (not paused)

3. Verify firewall isn't blocking port 5000

## Quick Test

Once the server is running, test registration:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456","displayName":"Test User"}'
```


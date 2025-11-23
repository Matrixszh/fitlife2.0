# Quick Fix: MongoDB Atlas Connection Error

## Error Message
```
Error: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## Solution: Whitelist Your IP Address

### Step 1: Go to MongoDB Atlas Network Access

1. Open your browser and go to: **https://cloud.mongodb.com/**
2. Log in to your MongoDB Atlas account
3. Select your project
4. Click **"Security"** in the left sidebar
5. Click **"Network Access"**

### Step 2: Add Your IP Address

**Option A: For Development (Easier)**
- Click **"Add IP Address"**
- Click **"Allow Access from Anywhere"** button
- Enter `0.0.0.0/0` in the IP address field
- Click **"Confirm"**
- ⚠️ **Note:** This allows access from any IP. Only use for development!

**Option B: For Production (More Secure)**
- Click **"Add IP Address"**
- Click **"Add Current IP Address"** (or enter your IP manually)
- Click **"Confirm"**

### Step 3: Wait for Changes

- MongoDB Atlas may take **1-2 minutes** to apply the changes
- You'll see a green checkmark when it's active

### Step 4: Verify Your .env File

Make sure you have a `.env` file in the `server` directory with:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fitlife?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters
PORT=5000
```

**Important:**
- Replace `YOUR_USERNAME` with your MongoDB Atlas username
- Replace `YOUR_PASSWORD` with your password (URL encode special characters!)
- Replace `cluster0.xxxxx` with your actual cluster address
- If your password has special characters, encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `/` → `%2F`

### Step 5: Restart Your Server

After whitelisting your IP, restart the server:

```bash
cd server
npm start
```

You should now see:
```
✅ MongoDB Atlas Connected: cluster0-shard-00-00.xxxxx.mongodb.net:27017
```

## Still Having Issues?

1. **Check your connection string** - Make sure it's correct in `.env`
2. **Verify cluster is running** - Check MongoDB Atlas dashboard
3. **Check internet connection** - Make sure you're online
4. **Try again in 2-3 minutes** - IP whitelist changes can take time

## Need Help?

See the full setup guide: `MONGODB_ATLAS_SETUP.md`


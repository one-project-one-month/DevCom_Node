# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   Create a `.env` file in the root directory with the following content:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   MONGO_URI=mongodb://localhost:27017/devcom

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=7d

   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system or update `MONGO_URI` to point to your MongoDB instance.

4. **Create Logs Directory**
   ```bash
   mkdir logs
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## Project Structure

The project follows a clean, modular architecture:

- **Layered Architecture**: Controller → Service → Repository → Model
- **Feature-based Modules**: Each feature (auth, user, post, etc.) is self-contained
- **Type Safety**: Full TypeScript support with proper types
- **Error Handling**: Centralized error handling middleware
- **Security**: JWT auth, rate limiting, helmet, CORS

## Database Models

- **User**: Authentication and profile data
- **Post**: User posts with tags
- **Comment**: Nested comments (reply support)
- **Reaction**: Like/unlike posts
- **Tag**: Post tags (managed by admin)

## API Endpoints

All endpoints are prefixed with `/api`

- `/auth/*` - Authentication routes
- `/users/*` - User management
- `/posts/*` - Post CRUD operations
- `/comments/*` - Comment management
- `/reactions/*` - Reaction management
- `/feed` - Global feed
- `/tags/*` - Tag management (admin only)

## Notes

- TypeScript errors may appear until `npm install` is run
- Make sure MongoDB is running before starting the server
- Logs will be written to the `logs/` directory
- The server will automatically create database indexes on first run

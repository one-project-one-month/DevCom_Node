# DevCom Social Media API

A production-ready social media backend API built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 👤 **User Management** - Profile management with avatar support
- 📝 **Posts** - Create, read, update, and delete posts with tags
- 💬 **Comments** - Nested comments support (reply to comments)
- ❤️ **Reactions** - Like/unlike posts
- 🏷️ **Tags** - Tag management (admin only)
- 📰 **Global Feed** - Aggregated feed with engagement metrics
- 🛡️ **Security** - Helmet, CORS, rate limiting
- 📊 **Logging** - Winston logger with file and console outputs

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Security**: Helmet, CORS, bcryptjs
- **Logging**: Winston

## Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point
├── config/                # Configuration files
│   ├── env.ts            # Environment variables
│   ├── database.ts       # MongoDB connection
│   └── logger.ts         # Winston logger setup
├── modules/               # Feature modules
│   ├── auth/             # Authentication
│   ├── user/             # User management
│   ├── post/             # Posts
│   ├── comment/          # Comments
│   ├── reaction/         # Reactions
│   ├── feed/             # Global feed
│   └── tag/              # Tags
├── common/                # Shared utilities
│   ├── middleware/       # Express middleware
│   ├── utils/            # Helper functions
│   ├── constants/        # Constants
│   ├── types/            # TypeScript types
│   └── exceptions/       # Custom error classes
├── routes/                # Route definitions
└── database/              # Database models
    └── models/           # Mongoose schemas
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd DevCom_Node
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
   - MongoDB connection string
   - JWT secret
   - Cloudinary credentials (optional)

5. Start the development server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile (auth required)
- `PUT /api/users/profile` - Update current user profile (auth required)
- `GET /api/users` - Get all users (auth required)

### Posts
- `POST /api/posts` - Create a post (auth required)
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post (auth required, owner only)
- `DELETE /api/posts/:id` - Delete a post (auth required, owner only)

### Comments
- `POST /api/comments/post/:postId` - Create a comment (auth required)
- `GET /api/comments/post/:postId` - Get all comments for a post
- `GET /api/comments/:id` - Get a specific comment
- `PUT /api/comments/:id` - Update a comment (auth required, owner only)
- `DELETE /api/comments/:id` - Delete a comment (auth required, owner only)

### Reactions
- `POST /api/reactions/post/:postId` - Toggle reaction (auth required)
- `GET /api/reactions/post/:postId/count` - Get reaction count
- `GET /api/reactions/post/:postId/check` - Check if user reacted (auth required)

### Feed
- `GET /api/feed` - Get global feed (paginated, optional auth)

### Tags
- `GET /api/tags` - Get all tags
- `GET /api/tags/:id` - Get a specific tag
- `DELETE /api/tags/:id` - Delete a tag (auth required, admin only)

## Database Schema

### Users
- id, name, email, password, role, avatar

### Posts
- id, title, content, image_url, tags[], author

### Comments
- id, comment_message, post, author, parent_comment_id

### Reactions
- id, post, user

### Tags
- id, name

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

See `.env.example` for all required environment variables.

## Docker

### Using Docker Compose

Start MongoDB and API together:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- API on port 3000

### Building Docker Image

```bash
docker build -t devcom-api .
docker run -p 3000:3000 --env-file .env devcom-api
```

### Pulling from GitHub Container Registry

```bash
docker pull ghcr.io/OWNER/REPO:latest
docker run -p 3000:3000 --env-file .env ghcr.io/OWNER/REPO:latest
```

## CI/CD

This project includes GitHub Actions workflows for continuous integration:

- **CI Workflow** (`.github/workflows/ci.yml`):
  - Runs on push/PR to `main` and `develop` branches
  - Sets up MongoDB 7.0 container
  - Runs linter, builds project, runs tests
  - Publishes to GitHub Packages (npm)
  - Builds and pushes Docker image to GitHub Container Registry

See `.github/workflows/README.md` for detailed CI/CD documentation.

## License

ISC

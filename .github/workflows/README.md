# CI/CD Workflow

This repository includes GitHub Actions workflows for continuous integration and deployment.

## Workflow Overview

### CI Workflow (`.github/workflows/ci.yml`)

The CI workflow runs on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

#### Jobs:

1. **Test Job**
   - Sets up MongoDB 7.0 container
   - Installs dependencies
   - Runs linter
   - Builds TypeScript project
   - Runs tests

2. **Build Job**
   - Runs after test job succeeds
   - Builds production version
   - Publishes to GitHub Packages (npm)
   - Requires test job to pass

3. **Docker Build Job**
   - Builds Docker image
   - Pushes to GitHub Container Registry (ghcr.io)
   - Tags images with branch, PR, semver, and SHA
   - Only pushes on non-PR events

## MongoDB Container

The workflow uses MongoDB 7.0 as a service container with:
- Username: `admin`
- Password: `password`
- Database: `devcom`
- Health checks enabled

Connection string: `mongodb://admin:password@localhost:27017/devcom?authSource=admin`

## GitHub Packages

### NPM Package
To publish as an npm package, ensure your `package.json` has:
```json
{
  "name": "@OWNER/devcom-social-media-api",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Docker Image
Docker images are automatically published to:
```
ghcr.io/OWNER/REPO:latest
ghcr.io/OWNER/REPO:main
ghcr.io/OWNER/REPO:sha-COMMIT_SHA
```

## Environment Variables

The workflow uses these environment variables:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Test JWT secret for CI
- `NODE_ENV`: Environment (test/production)

## Local Development with Docker

Use `docker-compose.yml` for local development:

```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- API on port 3000

## Manual Docker Build

```bash
docker build -t devcom-api .
docker run -p 3000:3000 --env-file .env devcom-api
```

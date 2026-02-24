# Facebook Service

This service automatically posts to your Facebook Page whenever a post is created on the DevCom platform.

## Features

- ✅ Automatic posting to Facebook Page on post creation
- ✅ Support for text posts, link posts, and photo posts
- ✅ Error handling with logging
- ✅ Non-blocking (won't fail your API request if Facebook fails)

## Usage

### Basic Integration

In your post service or controller, after creating a post:

```typescript
import { FacebookService } from "../facebook/facebook.service";

// After successfully creating post in database
const facebookService = new FacebookService();

// Post to Facebook (non-blocking)
facebookService.createPagePost({
  title: post.title,
  content: post.content,
  imageUrl: post.image_url, // Optional
  link: `https://your-platform.com/posts/${post.id}` // Optional
}).catch(error => {
  // Log error but don't fail the request
  logger.error("Failed to post to Facebook:", error);
});
```

### With Photo

If you want to post a photo specifically:

```typescript
await facebookService.createPagePostWithPhoto({
  title: post.title,
  content: post.content,
  imageUrl: post.image_url,
  caption: `${post.title}\n\n${post.content}`
});
```

## Configuration

Set these environment variables:

```env
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_PAGE_ACCESS_TOKEN=your_page_access_token
```

## Methods

### `createPagePost(data)`

Creates a post on Facebook Page. Can include text, link, or image.

**Parameters:**
- `title` (string): Post title
- `content` (string): Post content
- `imageUrl` (string, optional): Image URL
- `link` (string, optional): Link URL

**Returns:** `Promise<FacebookPostResponse | null>`

### `createPagePostWithPhoto(data)`

Creates a photo post on Facebook Page.

**Parameters:**
- `title` (string): Post title
- `content` (string): Post content
- `imageUrl` (string): Image URL (required)
- `caption` (string, optional): Photo caption

**Returns:** `Promise<FacebookPostResponse | null>`

## Error Handling

The service handles errors gracefully:
- If Facebook credentials are not configured, it logs a warning and returns `null`
- If Facebook API call fails, it logs the error and returns `null`
- Your main API request will not fail if Facebook posting fails

## Setup

See [FACEBOOK_SETUP.md](../../../FACEBOOK_SETUP.md) for detailed setup instructions.

## References

- [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api)
- [Pages API Reference](https://developers.facebook.com/docs/graph-api/reference/page)

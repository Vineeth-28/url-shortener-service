



# @vineet/url-shortener-service

[![npm version](https://img.shields.io/npm/v/@vineet/url-shortener-service)](https://www.npmjs.com/package/@vineet/url-shortener-service)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Vineeth-28/url-shortener-service/ci.yml?branch=main)](https://github.com/Vineeth-28/url-shortener-service/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Issues](https://img.shields.io/github/issues/Vineeth-28/url-shortener-service)](https://github.com/Vineeth-28/url-shortener-service/issues)
[![Last Commit](https://img.shields.io/github/last-commit/Vineeth-28/url-shortener-service)](https://github.com/Vineeth-28/url-shortener-service/commits/main)
[![Twitter Follow](https://img.shields.io/twitter/follow/vineetprak25565?style=social)](https://x.com/vineetprak25565)

A **production-ready URL Shortener Service** built with **Node.js, Express, tRPC, MongoDB, and Redis**.  
This package provides a complete backend service for creating, managing, and tracking short URLs with advanced caching and analytics support.

---

## ✨ Features

- 🔗 **URL Shortening** - Convert long URLs into compact, shareable short codes
- 📊 **Analytics & Tracking** - Monitor click counts, timestamps, and usage patterns  
- ⚡ **Redis Caching** - Lightning-fast URL lookups and counter management
- 🛡️ **Input Validation** - Built-in URL validation and sanitization using Zod
- 🎯 **Type-Safe APIs** - Full tRPC integration with end-to-end type safety
- 🏗️ **Clean Architecture** - Organized with services, repositories, and controllers
- 📝 **TypeScript First** - Fully typed with comprehensive IntelliSense support
- 🔄 **Auto-Redirect** - Seamless redirection to original URLs
- 📈 **Scalable Design** - Built for high-traffic production environments

---

## 📦 Installation

```bash
npm install @vineet/url-shortener-service
```

```bash
yarn add @vineet/url-shortener-service
```

```bash
pnpm add @vineet/url-shortener-service
```

### Prerequisites

- **Node.js** >= 16.0.0
- **MongoDB** (local or cloud instance)
- **Redis** (local or cloud instance)

---

## 🚀 Quick Start

### Basic Usage

```typescript
import { UrlShortenerService } from "@vineet/url-shortener-service";

const service = new UrlShortenerService({
  port: 3000,
  mongoUri: "mongodb://localhost:27017/urlshortener",
  redisUri: "redis://localhost:6379",
  baseUrl: "https://yourdomain.com"
});

// Start the server
await service.start();
console.log("🚀 URL Shortener Service is running on port 3000");
```

### With Environment Variables

```typescript
// .env file
PORT=3000
MONGO_URI=mongodb://localhost:27017/urlshortener
REDIS_URI=redis://localhost:6379
BASE_URL=https://yourdomain.com
NODE_ENV=production

// app.js
import { startServer } from "@vineet/url-shortener-service";

startServer(); // Automatically loads from .env
```

---

## 📚 Complete API Reference

### 🏥 Health Check

**GET** `/ping`

```bash
curl https://yourdomain.com/ping
```

**Response:**
```json
{
  "message": "pong",
  "timestamp": "2025-08-21T10:00:00.000Z",
  "uptime": 12345
}
```

---

### 🔗 URL Shortening

#### Create Short URL

**POST** `/trpc/url.create`

```typescript
// tRPC Client
const result = await client.url.create.mutate({
  originalUrl: "https://www.example.com/very/long/path?param=value"
});
```

**HTTP Request:**
```bash
curl -X POST https://yourdomain.com/trpc/url.create \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://www.example.com/very/long/path"}'
```

**Response:**
```json
{
  "shortUrl": "abc123",
  "fullUrl": "https://yourdomain.com/abc123",
  "originalUrl": "https://www.example.com/very/long/path",
  "createdAt": "2025-08-21T10:00:00.000Z",
  "clickCount": 0
}
```

---

#### Get Original URL

**GET** `/trpc/url.getOriginalUrl`

```typescript
// tRPC Client
const result = await client.url.getOriginalUrl.query({
  shortUrl: "abc123"
});
```

**HTTP Request:**
```bash
curl "https://yourdomain.com/trpc/url.getOriginalUrl?input={%22shortUrl%22:%22abc123%22}"
```

**Response:**
```json
{
  "originalUrl": "https://www.example.com/very/long/path",
  "shortUrl": "abc123",
  "clickCount": 42,
  "createdAt": "2025-08-21T10:00:00.000Z",
  "lastAccessed": "2025-08-21T11:30:00.000Z"
}
```

---

#### Get URL Analytics

**GET** `/trpc/url.getAnalytics`

```typescript
const analytics = await client.url.getAnalytics.query({
  shortUrl: "abc123"
});
```

**Response:**
```json
{
  "shortUrl": "abc123",
  "originalUrl": "https://www.example.com/very/long/path",
  "totalClicks": 42,
  "createdAt": "2025-08-21T10:00:00.000Z",
  "lastAccessed": "2025-08-21T11:30:00.000Z",
  "clickHistory": [
    "2025-08-21T10:15:00.000Z",
    "2025-08-21T10:30:00.000Z",
    "2025-08-21T11:30:00.000Z"
  ]
}
```

---

### 🔄 URL Redirection

**GET** `/:shortUrl`

```bash
curl -L https://yourdomain.com/abc123
# Automatically redirects to: https://www.example.com/very/long/path
```

**Features:**
- **301 Permanent Redirect** for SEO optimization
- **Click tracking** - Each access is logged
- **Fast Redis lookup** - Sub-millisecond response times
- **Fallback to MongoDB** if Redis cache miss

---

## ⚙️ Configuration Options

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3000` | Server port |
| `MONGO_URI` | Yes | - | MongoDB connection string |
| `REDIS_URI` | Yes | - | Redis connection string |
| `BASE_URL` | Yes | - | Base URL for short links |
| `NODE_ENV` | No | `development` | Environment mode |
| `REDIS_COUNTER_KEY` | No | `url_shortener_counter` | Redis counter key |
| `LOG_LEVEL` | No | `info` | Logging level |

### Programmatic Configuration

```typescript
import { UrlShortenerService } from "@vineet/url-shortener-service";

const service = new UrlShortenerService({
  // Server config
  port: 3000,
  host: "0.0.0.0",
  
  // Database config
  mongoUri: "mongodb://localhost:27017/urlshortener",
  redisUri: "redis://localhost:6379",
  
  // App config
  baseUrl: "https://yourdomain.com",
  
  // Optional advanced config
  cors: {
    origin: ["https://yourfrontend.com"],
    credentials: true
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  
  // Logging
  logLevel: "info"
});
```

---

## 💻 Usage Examples

### With Express.js Integration

```typescript
import express from "express";
import { createUrlRouter } from "@vineet/url-shortener-service";

const app = express();

// Use URL shortener as middleware
app.use("/api/urls", createUrlRouter({
  mongoUri: process.env.MONGO_URI,
  redisUri: process.env.REDIS_URI
}));

app.listen(3000);
```

### With tRPC Client (Frontend)

```typescript
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@vineet/url-shortener-service";

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "https://yourdomain.com/trpc"
    })
  ]
});

// React component example
function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const createShortUrl = async () => {
    try {
      const result = await client.url.create.mutate({ originalUrl });
      setShortUrl(result.fullUrl);
    } catch (error) {
      console.error("Failed to shorten URL:", error);
    }
  };

  return (
    <div>
      <input 
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter URL to shorten"
      />
      <button onClick={createShortUrl}>Shorten URL</button>
      {shortUrl && <p>Short URL: {shortUrl}</p>}
    </div>
  );
}
```

### Bulk URL Operations

```typescript
import { UrlService } from "@vineet/url-shortener-service";

const urlService = new UrlService({
  mongoUri: process.env.MONGO_URI,
  redisUri: process.env.REDIS_URI
});

// Bulk create short URLs
const urls = [
  "https://example1.com",
  "https://example2.com", 
  "https://example3.com"
];

const shortUrls = await Promise.all(
  urls.map(url => urlService.createShortUrl(url))
);

console.log(shortUrls);
```

---

## 🏗️ Architecture

The service follows a **clean architecture pattern**:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │ -> │    Services     │ -> │  Repositories   │
│                 │    │                 │    │                 │
│ • HTTP handlers │    │ • Business      │    │ • MongoDB       │
│ • tRPC routes   │    │   logic         │    │ • Redis         │
│ • Validation    │    │ • URL encoding  │    │ • Data access   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Benefits:**
- **Testable** - Each layer can be unit tested independently
- **Maintainable** - Clear separation of concerns
- **Scalable** - Easy to modify or extend functionality
- **Type-safe** - Full TypeScript coverage with tRPC

---

## 🔧 Advanced Configuration

### Custom URL Encoding

```typescript
import { UrlShortenerService, Base62Encoder } from "@vineet/url-shortener-service";

const service = new UrlShortenerService({
  // ... other config
  encoder: new Base62Encoder({
    minLength: 6,
    customAlphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  })
});
```

### Custom Middleware

```typescript
import { UrlShortenerService } from "@vineet/url-shortener-service";

const service = new UrlShortenerService({
  // ... config
  middleware: [
    // Custom authentication
    (req, res, next) => {
      const apiKey = req.headers["x-api-key"];
      if (!apiKey || !isValidApiKey(apiKey)) {
        return res.status(401).json({ error: "Invalid API key" });
      }
      next();
    },
    
    // Custom logging
    (req, res, next) => {
      console.log(`${req.method} ${req.path} - ${req.ip}`);
      next();
    }
  ]
});
```

---

## 📊 Monitoring & Analytics

### Built-in Metrics

The service automatically tracks:
- **Click counts** per short URL
- **Access timestamps** for analytics
- **Error rates** and response times
- **Cache hit/miss ratios**

### Custom Analytics Integration

```typescript
import { UrlShortenerService } from "@vineet/url-shortener-service";

const service = new UrlShortenerService({
  // ... config
  analytics: {
    onUrlCreated: (data) => {
      // Send to your analytics service
      analytics.track("url_created", {
        shortUrl: data.shortUrl,
        originalUrl: data.originalUrl
      });
    },
    
    onUrlAccessed: (data) => {
      // Track URL clicks
      analytics.track("url_accessed", {
        shortUrl: data.shortUrl,
        userAgent: data.userAgent,
        ip: data.ip
      });
    }
  }
});
```

---

## 🔍 Troubleshooting

### Common Issues

**1. Connection Errors**
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- **Solution:** Ensure MongoDB is running and accessible
- **Check:** `mongod --version` and connection string

**2. Redis Connection Issues**
```bash
Error: Redis connection failed
```
- **Solution:** Verify Redis is running: `redis-cli ping`
- **Check:** Redis URI format and authentication

**3. Port Already in Use**
```bash
Error: listen EADDRINUSE :::3000
```
- **Solution:** Change port in config or kill existing process
- **Check:** `lsof -i :3000` to find conflicting process

### Debug Mode

```typescript
import { UrlShortenerService } from "@vineet/url-shortener-service";

const service = new UrlShortenerService({
  // ... config
  logLevel: "debug", // Enable detailed logging
  debug: true        // Additional debug info
});
```

### Health Checks

Monitor service health:

```bash
# Basic health check
curl https://yourdomain.com/ping

# Database connectivity
curl https://yourdomain.com/health/db

# Redis connectivity  
curl https://yourdomain.com/health/redis
```

---

## 🧪 Testing

### Unit Testing

```typescript
import { UrlService } from "@vineet/url-shortener-service";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("UrlService", () => {
  let urlService: UrlService;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    urlService = new UrlService({
      mongoUri,
      redisUri: "redis://localhost:6379"
    });
  });

  it("should create short URL", async () => {
    const result = await urlService.createShortUrl("https://example.com");
    
    expect(result.originalUrl).toBe("https://example.com");
    expect(result.shortUrl).toHaveLength(6);
    expect(result.clickCount).toBe(0);
  });
});
```

### Integration Testing

```bash
npm run test:integration
```

---

## 🚀 Deployment

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/urlshortener
      - REDIS_URI=redis://redis:6379
      - BASE_URL=https://yourdomain.com
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:6
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  mongodb_data:
  redis_data:
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

### Development Setup

```bash
# Clone the repo
git clone https://github.com/Vineeth-28/url-shortener-service
cd url-shortener-service

# Install dependencies
npm install

# Start development services
docker-compose up -d mongo redis

# Run in development mode
npm run dev

# Run tests
npm test
```

### Commit Convention

We follow [Conventional Commits](https://conventionalcommits.org/):

```bash
feat: add batch URL creation endpoint
fix: handle Redis connection errors gracefully
docs: update API documentation
```

---

## 📄 License

MIT © 2025 [Vineeth](https://github.com/Vineeth-28) | Follow on [Twitter](https://x.com/vineetprak25565)

---

## 🙏 Acknowledgments

- Built with [tRPC](https://trpc.io/) for type-safe APIs
- Powered by [MongoDB](https://mongodb.com/) and [Redis](https://redis.io/)
- Inspired by modern URL shortening services

---

## 📞 Support & Connect

- **GitHub Issues:** [Report bugs or request features](https://github.com/Vineeth-28/url-shortener-service/issues)
- **GitHub Repository:** [View source code](https://github.com/Vineeth-28/url-shortener-service)
- **Developer Profile:** [Vineeth's GitHub](https://github.com/Vineeth-28)
- **Follow on Twitter:** [@vineetprak25565](https://x.com/vineetprak25565)

---

**⭐ Star this repo if it helped you! Follow for more awesome projects! 🚀**
# 🎥 Video Editing Backend API (Node.js + TypeScript)

This backend project enables users to upload, trim, add subtitles to, render, and download videos. Rendering is handled asynchronously using BullMQ and Redis. Built with Express, TypeScript, FFmpeg, Prisma, and PostgreSQL.

---

## Features

- Upload videos (Multer)
- Trim video segments (FFmpeg)
- Overlay subtitles with timing (FFmpeg drawtext)
- Render final edited videos
- Download rendered videos
- Background job queue using BullMQ + Redis

---

## Tech Stack

| Purpose              | Tool/Library                |
|----------------------|-----------------------------|
| Server               | Express.js (TypeScript)     |
| File Upload          | Multer                      |
| Video Processing     | FFmpeg                      |
| ORM / DB             | Prisma + PostgreSQL         |
| Queue Management     | BullMQ + Redis              |
| Dev Tools            | Nodemon, ts-node, Postman   |

---

## Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/Arkojeet/Video-backend
cd video-editor-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file:
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/videoeditor
```

### 4. Setup Prisma & Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Start Redis via Docker
```bash
docker run -d --name redis -p 6379:6379 redis
```

### 6. Start API Server
```bash
npm run dev
```

### 7. Start Background Worker (New Terminal)
```bash
npm run worker
```

---

## 🔧 API Endpoints

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| POST   | `/api/videos/upload`        | Upload a video file     |
| POST   | `/api/videos/:id/trim`      | Trim video by time      |
| POST   | `/api/videos/:id/subtitles` | Add subtitles overlay   |
| POST   | `/api/videos/:id/render`    | Queue video rendering   |
| GET    | `/api/videos/:id/download`  | Download final video    |

---

## 📊 Postman API Collection

To test the API using Postman:

1. Open Postman
2. Import the collection via public link
3. Use these example request bodies:

**Trim:**
```json
{
  "start": 5,
  "end": 15
}
```

**Subtitles:**
```json
{
  "text": "Hello world!",
  "start": 3,
  "end": 7
}
```

**Postman Share Link:**
```
https://www.postman.com/flight-specialist-49045556/video-editing-backend/collection/2tdo7lf/video-backend?action=share&creator=44535023
```

---

## Notes

- FFmpeg must be installed and accessible via CLI (`ffmpeg -version`)
- On Windows, use forward slashes in all paths (`C:/Windows/Fonts/...`)
- Subtitle rendering uses `drawtext`; ensure the font path is valid
- Background jobs use Redis via Docker

---

## Project Highlights

- Modular folder structure
- Robust error handling
- Async job queue with Redis
- Fully testable via Postman

---

## License

MIT © 2025 Arkojeet Mukherjee



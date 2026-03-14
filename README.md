# Portfolio – MERN with Google OAuth Contact

Public portfolio with a contact form gated by Google Sign-In. Visitors can browse freely; signing in with Google is required only to send messages. Messages are saved to MongoDB and sent to your email.

## What's included

- **Public portfolio** – Education, experience, projects, skills
- **Contact form** – Requires Google sign-in; sends messages to MongoDB + your email
- **MERN stack** – MongoDB, Express, React, Node.js
- **Email notifications** – Gmail SMTP; contact submissions are emailed to you

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Google OAuth credentials (see [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md))
- Gmail App Password for SMTP (see Gmail settings → Security → App passwords)

## Setup

### 1. Backend

```bash
cd server
cp .env.example .env
# Edit .env with MongoDB URI, Google OAuth, SMTP credentials
npm install
```

### 2. Frontend

```bash
cd client
cp .env.example .env
# Set VITE_API_URL=http://localhost:5001
npm install
```

### 3. Google OAuth

See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for OAuth credentials.

## Run

**Terminal 1 – server**

```bash
cd server
npm run dev
```

**Terminal 2 – client**

```bash
cd client
npm run dev
```

- Portfolio: http://localhost:5173  
- API: http://localhost:5001  

Flow: **Get in touch** → **Sign in with Google** → enter message → sent to MongoDB + your email.

## API endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/test-email` | Send a test email (checks SMTP setup) |
| `GET /api/auth/google` | Start Google OAuth |
| `GET /api/auth/me` | Check if user is logged in |
| `POST /api/contact` | Submit contact message (requires auth) |

## Environment variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `SESSION_SECRET` | Random string for session encryption |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `PORT` | Server port (default 5001; avoids macOS AirPlay on 5000) |
| `CLIENT_URL` | Frontend URL (e.g. http://localhost:5173) |
| `API_URL` | Backend base URL (e.g. http://localhost:5001) |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASS` | Gmail App Password |
| `NOTIFY_EMAIL` | Where to receive contact form emails |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (e.g. http://localhost:5001) |

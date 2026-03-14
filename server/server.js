import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import connectDB from './config/db.js';
import './config/passport.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import { sendEmail } from './utils/email.js';

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 7 * 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/debug-env', (req, res) => {
  const keys = [
    'MONGODB_URI',
    'SESSION_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'PORT',
    'CLIENT_URL',
    'API_URL',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'NOTIFY_EMAIL',
  ];
  const env = {};
  for (const k of keys) {
    const v = process.env[k];
    if (v === undefined) env[k] = 'missing';
    else if (k.includes('PASS') || k.includes('SECRET')) env[k] = v ? `${v.length} chars` : 'empty';
    else if (k === 'MONGODB_URI') env[k] = v ? 'set (hidden)' : 'missing';
    else env[k] = v;
  }
  res.json({
    cwd: process.cwd(),
    env,
  });
});

app.get('/api/test-email', async (req, res) => {
  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  const hasSmtp = process.env.SMTP_USER && process.env.SMTP_PASS;
  if (!to) {
    return res.status(500).json({
      error: 'Set NOTIFY_EMAIL or SMTP_USER in .env',
      debug: {
        NOTIFY_EMAIL: process.env.NOTIFY_EMAIL ? 'set' : 'missing',
        SMTP_USER: process.env.SMTP_USER ? 'set' : 'missing',
      },
    });
  }
  if (!hasSmtp) {
    return res.status(500).json({
      error: 'Set SMTP_USER and SMTP_PASS in .env',
      debug: {
        SMTP_USER: process.env.SMTP_USER ? 'set' : 'missing',
        SMTP_PASS: process.env.SMTP_PASS ? 'set' : 'missing',
      },
    });
  }
  try {
    await sendEmail({
      to,
      subject: 'Portfolio – test email',
      text: 'If you got this, your email setup is working.',
    });
    res.json({ success: true, message: `Test email sent to ${to}` });
  } catch (err) {
    console.error('Test email failed:', err);
    res.status(500).json({
      error: err.message || 'Failed to send test email',
      details: err.code || err.responseCode,
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import { Router } from 'express';
import ContactMessage from '../models/ContactMessage.js';
import { requireAuth } from '../middleware/auth.js';
import { sendContactNotification } from '../utils/email.js';

const router = Router();

router.post('/', requireAuth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const name = req.user.displayName;
    const email = req.user.emails?.[0]?.value || '';

    const contactMessage = new ContactMessage({
      name,
      email,
      message: message.trim(),
      googleId: req.user.id,
    });

    await contactMessage.save();

    try {
      await sendContactNotification({
        name,
        email,
        message: message.trim(),
      });
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr);
    }

    res.status(201).json({ success: true, id: contactMessage._id });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;

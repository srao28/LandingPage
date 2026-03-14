import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Start Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}?contact=open`);
  }
);

// Check if user is logged in
router.get('/me', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        name: req.user.displayName,
        email: req.user.emails?.[0]?.value,
        picture: req.user.photos?.[0]?.value,
      },
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

export default router;

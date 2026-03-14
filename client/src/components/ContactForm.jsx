import { useState, useEffect } from 'react';
import { checkAuth, submitContact } from '../api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ContactForm({ onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth()
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSignIn = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const handleLogout = () => {
    window.location.href = `${API_URL}/api/auth/logout`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    setError('');
    try {
      await submitContact(message);
      setSent(true);
      setMessage('');
    } catch (err) {
      setError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="contact-modal">
        <div className="contact-content">
          <p className="contact-loading">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="contact-modal">
        <div className="contact-content">
          <h2>Contact</h2>
          <p className="contact-intro">
            Sign in with Google to send a message. This helps keep spam low.
          </p>
          <button type="button" className="btn-primary" onClick={handleSignIn}>
            Sign in with Google
          </button>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="contact-modal">
        <div className="contact-content">
          <h2>Message sent</h2>
          <p>Thanks for reaching out. I&apos;ll get back to you soon.</p>
          <button type="button" className="btn-primary" onClick={() => setSent(false)}>
            Send another
          </button>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-modal">
      <div className="contact-content">
        <h2>Send a message</h2>
        <div className="contact-user">
          <img
            src={user.picture}
            alt=""
            width={32}
            height={32}
            className="contact-avatar"
          />
          <div>
            <span className="contact-name">{user.name}</span>
            <span className="contact-email">{user.email}</span>
          </div>
          <button
            type="button"
            className="btn-ghost btn-small"
            onClick={handleLogout}
          >
            Switch account
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message…"
            rows={4}
            required
          />
          {error && <p className="contact-error">{error}</p>}
          <div className="contact-actions">
            <button type="submit" className="btn-primary" disabled={sending}>
              {sending ? 'Sending…' : 'Send'}
            </button>
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

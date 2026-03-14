const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const fetchApi = (path, options = {}) => {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

export const checkAuth = () => fetchApi('/api/auth/me').then((r) => r.json());

export const submitContact = (message) =>
  fetchApi('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ message }),
  }).then((r) => {
    if (!r.ok) throw new Error(r.statusText || 'Failed to send');
    return r.json();
  });

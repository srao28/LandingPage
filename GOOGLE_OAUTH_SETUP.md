# Google OAuth Setup Steps

Follow these steps to configure Google Sign-In for the contact form.

## 1. Go to Google Cloud Console

Open [Google Cloud Console](https://console.cloud.google.com/).

## 2. Create a Project (or select existing)

- Click the project dropdown at the top
- Click **New Project**
- Name it (e.g. "Portfolio") and click **Create**
- Select the new project

## 3. Configure OAuth Consent Screen

- Go to **APIs & Services** → **OAuth consent screen** (left sidebar)
- Choose **External** (or Internal if you use Google Workspace)
- Click **Create**
- Fill in:
  - **App name:** Your name or portfolio name
  - **User support email:** Your email (e.g. srao65@asu.edu)
  - **Developer contact:** Your email
- Click **Save and Continue**
- On **Scopes** → **Save and Continue**
- On **Test users** (if in Testing mode) → Add your email if you want to test → **Save and Continue**

## 4. Create OAuth 2.0 Credentials

- Go to **APIs & Services** → **Credentials**
- Click **+ Create Credentials** → **OAuth client ID**
- **Application type:** Web application
- **Name:** Portfolio (or any name)
- Under **Authorized JavaScript origins**, add:
  - `http://localhost:5173` (for local dev)
  - `http://localhost:5001` (backend)
  - For production: `https://yourdomain.com` and `https://api.yourdomain.com` (or whatever your URLs are)
- Under **Authorized redirect URIs**, add:
  - `http://localhost:5001/api/auth/google/callback`
  - For production: `https://your-api-domain.com/api/auth/google/callback` (match your API URL)
- Click **Create**
- Copy the **Client ID** and **Client Secret**

## 5. Add Credentials to Your App

### Server (`server/.env`)

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

Create `server/.env` from `server/.env.example` and paste your values.

### Security Note

- Never commit `.env` to git (it should be in `.gitignore`)
- Keep your **Client Secret** private
- For production, use environment variables on your hosting provider (Vercel, Render, etc.)

## 6. Publish (optional, for public use)

While in **Testing** mode, only test users you add can sign in. To allow anyone with a Google account:

- Go to **OAuth consent screen**
- Click **Publish App**
- You may need to submit for verification if you request sensitive scopes (profile/email are usually fine without)

## Summary Checklist

- [ ] Project created in Google Cloud Console
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 Web client created
- [ ] `http://localhost:5173` and `http://localhost:5000` in Authorized JavaScript origins
- [ ] `http://localhost:5001/api/auth/google/callback` in Authorized redirect URIs
- [ ] Client ID and Client Secret in `server/.env`

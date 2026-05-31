# Firebase Hosting Operations

This project is designed to run as a static web app on Firebase Hosting.

## Current Hosting Setup

Configuration file: `firebase.json`

Current behavior:

- Public directory: `dist`
- Build command: `npm run build`
- Deploy command: `npm run deploy`
- SPA rewrite: all paths are rewritten to `/index.html`
- Security headers are configured for static hosting

The default Firebase project is defined in `.firebaserc`.

```json
{
  "projects": {
    "default": "ai-edu-readmuch"
  }
}
```

## Deploy

```bash
npm run deploy
```

This runs:

```bash
npm run build && firebase deploy
```

## Spark Plan Guidelines

This repository should remain compatible with Firebase Spark plan usage.

Do not add:

- Cloud Functions
- Firestore-backed content storage
- Firestore-heavy logging or analytics
- Cloud Storage uploads for large media
- External AI API calls from the app
- Server-side search APIs
- BigQuery export
- Any feature requiring Blaze plan activation

Static Firebase Hosting is the intended deployment target.

## Analytics Status

Firebase Analytics is not currently connected in the codebase.

No `firebase/analytics`, `getAnalytics`, `gtag`, or Firebase app initialization code is present.

If analytics is considered later:

1. Confirm whether Firebase Analytics can be used within the project's privacy and cost constraints.
2. Document the purpose of measurement before adding code.
3. Avoid collecting personally identifiable information.
4. Do not connect BigQuery export or paid analytics services.
5. Provide a clear privacy notice if analytics is enabled.

For now, do not add Analytics by default.

## SPA Rewrite and Future Routing

The current rewrite is:

```json
{
  "source": "**",
  "destination": "/index.html"
}
```

This is suitable for a future client-side router such as React Router. It allows paths like `/lessons/...` to serve the app shell.

The current app does not yet use URL-based routing. It uses local React state for tab navigation.

## Operational Checklist

Before deployment:

```bash
npm run lint
npm run build
```

Optional text check:

```bash
npm run check:text
```

After deployment:

- Open the Hosting URL.
- Check the home page.
- Check the course page.
- Confirm long lesson content renders without layout breakage.
- Confirm no paid Firebase features were added.

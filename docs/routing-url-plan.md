# URL Routing Plan

This document describes the current navigation structure and a recommended future URL structure for shareable education materials.

## Current State

The app currently uses tab-based state in `src/App.jsx`.

Current top-level views:

- Home
- Course
- Practice
- Templates
- FAQ

The active view is stored in React state:

```js
const [activeTab, setActiveTab] = useState("home")
```

There is no React Router setup today, and individual lessons or activities do not have unique URLs.

## Current Limitation

Because navigation is state-based:

- A course page cannot be shared as a direct URL.
- A specific lesson cannot be bookmarked directly.
- A specific activity or worksheet cannot be linked from outside the app.

This is acceptable for the current static app, but it limits public education material reuse.

## Recommended Future URL Structure

When URL routing is introduced, use clear content-oriented paths:

```text
/lessons
/lessons/:lessonSlug
/activities
/activities/:activitySlug
/resources
/resources/:resourceSlug
/worksheets
/worksheets/:worksheetSlug
```

Examples:

```text
/lessons/ai-terms
/lessons/prompt-five-elements
/activities/meeting-summary
/resources/safe-ai-checklist
/worksheets/ai-work-classification
```

## Firebase Hosting Compatibility

The current `firebase.json` contains an SPA rewrite:

```json
{
  "source": "**",
  "destination": "/index.html"
}
```

This is compatible with future client-side routing. Firebase Hosting can serve `/lessons/ai-terms` to the React app, and the client router can render the correct page.

## Recommended Implementation Path

Do not introduce URL routing as part of documentation-only maintenance.

When routing is implemented later:

1. Add a small router dependency only if needed.
2. Keep existing tab navigation working.
3. Add top-level routes first, such as `/`, `/course`, `/practice`, `/templates`, `/faq`.
4. Add lesson detail routes only after content has stable slugs.
5. Keep old tab behavior as a fallback during migration.
6. Verify Firebase Hosting direct URL refresh behavior.

## Slug Guidelines

Use stable, readable slugs:

- Lowercase English
- Hyphen-separated
- No spaces
- No dates unless versioning is required
- Do not change slugs after publishing without redirects

Examples:

```text
ai-terms
chatgpt-first-question
prompt-five-elements
safe-ai-use
meeting-summary
```

## TODO

- Define stable IDs and slugs for lessons, activities, resources, and worksheets.
- Decide whether to introduce React Router.
- Add direct links only after route behavior is verified.
- Add internal link generation from content metadata.
- Document redirect policy if published slugs change.

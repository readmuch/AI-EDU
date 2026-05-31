# Content Directory

This directory is reserved for future Markdown or MDX-based education content.

The current app still reads content from JavaScript data files in `src/data`. Do not move production content into this directory until the rendering path is updated and tested.

Recommended future structure:

```text
content/
  lessons/
  activities/
  resources/
  worksheets/
```

Suggested content types:

- `lessons/`: full lesson materials, lecture notes, and curriculum units
- `activities/`: hands-on practice tasks and classroom activities
- `resources/`: reference links, reading lists, and reusable guides
- `worksheets/`: printable or copyable learner worksheets

Migration should be incremental:

1. Define frontmatter fields for title, slug, audience, duration, license, and updated date.
2. Convert one low-risk lesson to Markdown as a pilot.
3. Add rendering support without breaking the existing `src/data` flow.
4. Verify build, lint, and Korean text checks.
5. Only then migrate more content.

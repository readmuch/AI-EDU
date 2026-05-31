# Content Management

This project currently stores education content as JavaScript data.

## Current Structure

Primary content files:

```text
src/data/
  mobileCourseData.js
  introCourseLessons.js
  expandedCourseLessons.js
  courseData.js
  lectureDetailData.js
```

Current app views import these files directly. This keeps the app simple and avoids server-side content infrastructure.

## Current Policy

For this phase:

- Keep existing `src/data` content in place.
- Do not migrate all content to Markdown or MDX yet.
- Do not introduce a CMS, Firestore content storage, or server-side content API.
- Do not add external AI API calls for content generation.
- Prefer small documentation and structure changes over large refactors.

## Future Markdown/MDX Structure

The repository now includes a reserved `content/` directory:

```text
content/
  lessons/
  activities/
  resources/
  worksheets/
```

Recommended meaning:

- `lessons/`: full lesson materials and lecture notes
- `activities/`: classroom or self-study activities
- `resources/`: reference material and reusable guides
- `worksheets/`: learner worksheets and printable tasks

## Suggested Frontmatter

If Markdown or MDX is introduced later, each content file should include frontmatter similar to:

```yaml
---
title: "AI 용어 정리"
slug: "ai-terms"
type: "lesson"
audience: "AI 초보 학습자"
duration: "50분"
license: "CC BY 4.0"
updated: "2026-05-31"
---
```

Recommended fields:

- `title`
- `slug`
- `type`
- `audience`
- `duration`
- `license`
- `updated`
- `courseId`
- `lessonNumber`

## Migration Plan

Use an incremental migration path:

1. Keep `src/data` as the source of truth.
2. Convert one non-critical lesson to Markdown as a pilot.
3. Add a build-time parser only if it does not require a paid service.
4. Keep the existing UI working during the pilot.
5. Compare rendered output with the current JS data version.
6. Migrate additional content only after build and lint pass.

## Quality Checklist

Before adding or changing content:

- Is the intended audience clear?
- Does the lesson include goals, explanation, examples, activity, quiz, and summary?
- Are sensitive examples fictional or anonymized?
- Are paid tools or paid Firebase features avoided?
- Does the text avoid promising guaranteed AI results?
- Does the license allow reuse?

## License

Educational content is intended to be reusable under CC BY 4.0 unless otherwise noted. See `LICENSE.md`.

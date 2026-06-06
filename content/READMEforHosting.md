# Content Directory

This directory stores source materials that are not rendered directly as pages.

Insight source Markdown belongs in `content/insight-sources`. The public insight pages are fixed React components registered from `src/data/insightData.js` and `src/views/insights/insightPageMap.js`.

## Publishing a New Insight From Source Markdown

Adding a Markdown file to `content/insight-sources` does not automatically publish a post. Source Markdown is only drafting and reference material. To publish a new insight, complete all of these steps:

1. Add the raw source Markdown file.

   ```text
   content/insight-sources/my-new-insight.md
   ```

   Use frontmatter for reference metadata:

   ```md
   ---
   title: "My new insight title"
   category: "AI Adoption"
   date: "2026-06-06"
   summary: "One-sentence summary for the insight card and header."
   sourceTitle: "Original source title"
   sourceUrl: "https://..."
   readTime: "5 min"
   audience: "office worker, leader, educator"
   ---

   ## Summary

   Summary paragraphs for drafting.

   ## Implications

   Implication paragraphs for drafting.
   ```

2. Create a fixed page component for the published post.

   ```text
   src/views/insights/MyNewInsight.js
   ```

   The public page should use `FixedInsightArticle` and a `sections` array. The current preferred published format is to show only the source Markdown's summary and implications sections.

   ```js
   import React from "react"
   import { FixedInsightArticle } from "./FixedInsightArticle.js"

   export const myNewInsightSections = [
     { id: "summary-heading", type: "heading", text: "Summary" },
     { id: "summary-1", type: "paragraph", text: "Published summary paragraph." },
     { id: "implications-heading", type: "heading", text: "Implications" },
     { id: "implications-1", type: "paragraph", text: "Published implication paragraph." },
   ]

   function MyNewInsight() {
     return React.createElement(FixedInsightArticle, { sections: myNewInsightSections })
   }

   export default MyNewInsight
   ```

3. Register the page component in the component map.

   ```text
   src/views/insights/insightPageMap.js
   ```

   Example:

   ```js
   import MyNewInsight from "./MyNewInsight.js"

   export const insightPageMap = {
     openai: OpenAiTaxAgentInsight,
     "my-new-insight": MyNewInsight,
   }
   ```

4. Add the list and header metadata in `src/data/insightData.js`.

   The `id` must match the key used in `insightPageMap`.

   ```js
   {
     id: "my-new-insight",
     title: "My new insight title",
     category: "AI Adoption",
     date: "2026-06-06",
     summary: "One-sentence summary for the insight card and header.",
     sourceTitle: "Original source title",
     sourceUrl: "https://...",
     sourcePath: "content/insight-sources/my-new-insight.md",
     readTime: "5 min",
     audience: ["office worker", "leader", "educator"],
   }
   ```

5. Verify the post before publishing.

   ```powershell
   npm.cmd run check:insights
   npm.cmd run lint
   npm.cmd run build
   ```

6. Review the local URL.

   ```text
   http://127.0.0.1:5173/#insights/my-new-insight
   ```

## Editing Published Insight Posts

Published insight posts are edited in two places:

1. Edit the visible detail page content in the fixed React page component.

   Example:

   ```text
   src/views/insights/OpenAiTaxAgentInsight.js
   ```

   The page body is the `sections` array. Current section types are:

   ```js
   type: "heading"   // section heading
   type: "paragraph" // body paragraph
   type: "list"      // bullet list
   type: "callout"   // highlighted note
   ```

   For example, update a paragraph by changing its `text` value:

   ```js
   {
     id: "summary-1",
     type: "paragraph",
     text: "Update the visible page text here.",
   }
   ```

2. Edit the list card and detail header metadata in:

   ```text
   src/data/insightData.js
   ```

   The fields shown in insight lists and page headers include:

   ```js
   {
     id: "openai",
     title: "Title shown in the list and detail header",
     category: "AI Workflow",
     date: "2026-05-27",
     summary: "Summary shown in the card and detail header",
     sourceTitle: "Source title",
     sourceUrl: "https://...",
   }
   ```

Raw Markdown files in `content/insight-sources` are drafting and reference material only. They are not rendered directly on the website. To change what visitors see, edit the React page component and `src/data/insightData.js`.

After editing a published insight, run:

```powershell
npm.cmd run check:insights
npm.cmd run build
```

For local review, open the insight URL, for example:

```text
http://127.0.0.1:5173/#insights/openai
```

Recommended future structure:

```text
content/
  insight-sources/
  lessons/
  activities/
  resources/
  worksheets/
```

Suggested content types:

- `insight-sources/`: raw research notes, source summaries, and drafting material for published insight pages
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

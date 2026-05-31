# Mobile UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the app as a responsive single-structure education service with mobile bottom navigation and desktop shared navigation.

**Architecture:** Replace the long landing-page composition with a small app shell that switches between five views: Home, Course, Practice, Templates, and FAQ. Use clean Korean mobile-focused data and shared components for navigation, accordions, copy buttons, and section headers.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 4, ESLint, Node-based static UX verification script.

---

### Task 1: UX Verification Script

**Files:**
- Create: `scripts/check-mobile-ux.mjs`
- Modify: `package.json`

- [ ] Add `scripts/check-mobile-ux.mjs` to verify required source markers: bottom nav, five tabs, `aria-current`, copy status, and mobile text constraints.
- [ ] Add `check:ux` script to `package.json`.
- [ ] Run `npm run check:ux`; expected result before implementation: FAIL because the new shell files do not exist yet.

### Task 2: Mobile-Focused Data

**Files:**
- Create: `src/data/mobileCourseData.js`

- [ ] Add clean Korean data for navigation tabs, learning levels, practice examples, templates, FAQ, and outcomes.
- [ ] Keep data small enough for mobile reading and avoid using broken existing strings.
- [ ] Export named arrays consumed by the new views.

### Task 3: Shared Components

**Files:**
- Create: `src/components/mobile/BottomNavigation.jsx`
- Create: `src/components/mobile/DesktopNavigation.jsx`
- Create: `src/components/mobile/SectionHeader.jsx`
- Create: `src/components/mobile/Accordion.jsx`
- Create: `src/components/mobile/CopyButton.jsx`

- [ ] Build accessible navigation buttons with `aria-current`.
- [ ] Build reusable accordions for long sections.
- [ ] Build reusable copy button with visible copied state.

### Task 4: Responsive Views

**Files:**
- Create: `src/views/HomeView.jsx`
- Create: `src/views/CourseView.jsx`
- Create: `src/views/PracticeView.jsx`
- Create: `src/views/TemplateView.jsx`
- Create: `src/views/FaqView.jsx`

- [ ] Implement Home with primary course CTA, large practice/template shortcuts, and three learning path cards.
- [ ] Implement Course with level selector and mobile-first accordions.
- [ ] Implement Practice with job-type cards and copyable prompts.
- [ ] Implement Templates with category filters and copyable template cards.
- [ ] Implement FAQ with concise accordion questions.

### Task 5: App Shell And Styling

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.css`

- [ ] Replace the old long section list with the responsive app shell.
- [ ] Use bottom navigation on mobile and shared desktop navigation on wider screens.
- [ ] Add global mobile text, button, and scroll padding rules.
- [ ] Keep existing old section components in the repo but unused.

### Task 6: Verification

**Files:**
- No new files.

- [ ] Run `npm run check:ux`; expected PASS.
- [ ] Run `npm run lint`; expected PASS.
- [ ] Run `npm run build`; expected PASS.
- [ ] Start dev server and provide local URL for review.

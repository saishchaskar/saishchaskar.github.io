# Portfolio Style Guide

Theme tokens live in [`assets/css/theme.css`](assets/css/theme.css); shared page
layouts and components live in [`assets/css/site-redesign.css`](assets/css/site-redesign.css).
Use these styles when adding sections so the dedicated pages stay consistent.

## Color and typography

```css
--site-bg: #eaf0f6;
--site-surface: #f5f8fc;
--site-text: #17253b;
--site-muted: #52627a;
--site-accent: #315fe8;
--site-highlight: #61751f;
--site-lime: #c4e25b;
--font-body: 'Karla', sans-serif;
```

Dark mode overrides the same tokens under `html[data-theme="dark"]`.
The cobalt and lime palette should feel technical without becoming
industry-specific. Use lime as a deliberate highlight, and layer soft blue/green
gradients and low-contrast grids into the background instead of leaving it flat.
Dark mode uses deep navy surfaces with accessible text and accent contrast.

## Layout and components

- Keep the hierarchy editorial and task-led: the homepage introduces the work,
  projects explain outcomes and status, experience connects roles to capabilities,
  and contact offers direct channels.
- Reuse `site-header`, `page-shell`, `section-pad`, `featured-case`, `case-row`,
  `capability-grid`, and `site-footer-v2` rather than rebuilding page chrome.
- Use HTML/CSS project illustrations instead of generic stock imagery. Label
  sample UI and values as illustrative, and avoid presenting planned features
  as shipped behavior.
- Keep headings on the same Karla type scale as body copy, using weight and
  spacing rather than decorative font changes.
- Keep motion subtle and respect `prefers-reduced-motion`.
- The contact form opens a mailto message; it does not send or store form data.

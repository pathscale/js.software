# Showcase QA follow-ups

The button audit exercised named control behavior on desktop. Use the current
[rendered QA suite](../../tests/ps-qa/checks/) as the baseline and collect fresh
evidence against the version under review.

- Review the theme editor and representative component showcases at mobile
  widths. Exercise saved themes, preview actions, and controls that open
  overlays, and check for clipping and horizontal overflow.
- Check accessible names, focus order and restoration, and announcements with
  a screen reader. Keep the existing keyboard and pointer checks in rendered QA.
- Re-run strict control inventory. Where a control still lacks a stable
  identity and needs to be targeted by automation, add a stable DOM ID and
  retain the named behavior assertion.

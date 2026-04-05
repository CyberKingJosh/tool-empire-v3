# SCREENSHOT REVIEW LOG
# Every tool records its visual review here after deployment.
# Format: | slug | date | result | notes |

| Slug | Date | Result | Notes |
|------|------|--------|-------|
| invoice-generator-australia | 2026-03-17 | FIXED | Logo wasn't showing (filename mismatch .png vs .jpeg). Invoice preview upgraded: paper-document styling with gradient top bar, larger total (clamp 28-40px), separated download CTA. Xero affiliate box: added Clearbit logo, live link, commission comment. All 3 sizes clean. |
| invoice-generator-australia | 2026-03-22 | FIXED | Re-review. v1: Fixed line item inputs (44px→48px, 14px→16px font), labels (12px→13px), From/To grid responsive stacking, preview table column widths. Build fixes: ts-expect-error on puppeteer import, AdSenseSlot window cast. Stale .next cache cleared to fix logo 404. All 3 sizes (375/768/1280) pass full checklist. Compared against Xero, Billdu, RosterElf — our animated preview is the differentiator. |
| current-time-in-london | 2026-03-17 | FIXED | Round 1: broken logo image showing "io" text before h1 (logoPath pointed to nonexistent file). Fix: set logoPath to null. Round 2: all clean. Light theme with massive JetBrains Mono time, analog clock with ambient colour shift, 12h/24h toggle, quick facts cards, Calendly affiliate with Clearbit logo. All 3 sizes (375/768/1280) responsive and polished. |
| resume-cv-builder-australia | 2026-03-22 | PASSED | Clean on first build. Writing palette (#8B2FC9 primary), completion ring speedometer, live preview, accordion sections, Grammarly affiliate with Clearbit logo, RelatedTools from builtTools.ts registry. All 3 sizes (375/768/1280) responsive and polished. |

# SCREENSHOT WORKFLOW — MANDATORY FOR EVERY TOOL
# This is the single source of truth. Every tool agent follows this exactly.
# No tool is marked BUILT until this entire workflow completes.

---

## PREREQUISITES

The Playwright MCP server must be active. If not installed:
```bash
claude mcp add playwright npx @playwright/mcp@latest
```
Confirm it is running with `/mcp` before starting any tool build.

Use the Playwright MCP tools (browser_navigate, browser_screenshot, etc.) for all screenshots — NOT the CLI `npx playwright screenshot` command.

---

## PART A — COMPETITOR SCREENSHOTS (before writing any code)

1. Identify the top 3 competitor pages for this tool's target keyword.
2. For each competitor:
   - Use Playwright MCP to navigate to the competitor URL.
   - Take a full-page screenshot.
   - Save as PNG inside: `/tool-empire-v3/screenshots/[tool-slug]/competitors/`
   - Name them: `competitor1.png`, `competitor2.png`, `competitor3.png`
3. Create `/tool-empire-v3/screenshots/[tool-slug]/competitors/research-notes.md` with:
   - URL of each competitor
   - Layout approach (sidebar? single column? card-based?)
   - Colour scheme and fonts observed
   - What works well — reference for our design
   - What to avoid — weaknesses we will fix
   - Three specific design decisions for our tool based on this research

**This replaces the old "imagine competitors" approach. You must visit real pages.**

---

## PART B — OUR SITE SCREENSHOTS (after building the tool)

1. Start the dev server (`npm run dev`) or use the deployed URL.
2. Use Playwright MCP to navigate to the tool page.
3. Take a full-page screenshot.
4. Save as PNG inside: `/tool-empire-v3/screenshots/[tool-slug]/ours/`
   - Name it `v1.png`
   - Increment to `v2.png`, `v3.png` for each revision.
5. Create `/tool-empire-v3/screenshots/[tool-slug]/ours/visual-review.md` with:

### Review Checklist

**Colour & Contrast:**
- [ ] Colours match DESIGN_SYSTEM.md palette for this category
- [ ] No colour clashes or unintended combinations
- [ ] Text has sufficient contrast against background (WCAG AA minimum)
- [ ] Dark text on light surfaces, light text on dark surfaces — no grey-on-grey

**Logo & Branding:**
- [ ] Logo is visible and correctly positioned (if applicable)
- [ ] Logo does not overlap text or other elements
- [ ] If no logo file exists, logoPath is set to null (no broken image icon)

**Typography & Readability:**
- [ ] H1 is the largest text on page — clear hierarchy
- [ ] Body text is at least 16px
- [ ] All text is readable without squinting
- [ ] Numbers use tabular-nums where applicable (clocks, tables, calculations)

**Layout & Alignment:**
- [ ] Tool interaction is visible above the fold on desktop
- [ ] No elements overflow horizontally on any viewport
- [ ] Inputs are at least 48px tall (touch targets)
- [ ] Calculate/generate button is prominent and fully visible
- [ ] Content is centred with reasonable max-width on desktop
- [ ] Related tools section renders correctly (or renders nothing if no related tools exist)

**Buttons & CTAs:**
- [ ] Primary CTA button has strong contrast and is immediately visible
- [ ] Affiliate box has real link, real company logo (Clearbit), and opens in new tab

**Overall:**
- [ ] Page looks intentionally designed, not just "works"
- [ ] Visually better than at least 2 of the 3 competitor screenshots
- [ ] Would you bookmark this? Would you share a screenshot of it?

6. If ANY checkbox fails:
   - Fix the code
   - Restart dev server or redeploy
   - Take a new screenshot as `v2.png` (or next version number)
   - Update visual-review.md with what was fixed
   - Review again
   - Repeat until ALL checkboxes pass

---

## PART C — SUMMARY FILE

Create `/tool-empire-v3/screenshots/[tool-slug]/summary.md` with this structure:

```markdown
# Screenshot Summary: [Tool Name]

## Competitor Screenshots

### competitor1.png
- **URL:** [actual URL]
- **Notes:** [one-line description of what was noted]

### competitor2.png
- **URL:** [actual URL]
- **Notes:** [one-line description of what was noted]

### competitor3.png
- **URL:** [actual URL]
- **Notes:** [one-line description of what was noted]

## Our Screenshots

### v1.png
- **Status:** [PASS / FAILED — list issues]
- **Changes:** Initial build

### v2.png (if applicable)
- **Status:** [PASS / FAILED — list issues]
- **Changes:** [what was fixed from v1]

## Final Comparison
[How does our finished version compare visually to the competitors?
What did we do better? What are they still doing better that we should note for future iterations?]
```

---

## FOLDER STRUCTURE (created for every tool)

```
/tool-empire-v3/screenshots/[tool-slug]/
  /competitors/
    competitor1.png
    competitor2.png
    competitor3.png
    research-notes.md
  /ours/
    v1.png
    v2.png  (only if revised)
    visual-review.md
  summary.md
```

---

## WHEN TO SKIP

Never skip. Every tool gets this full workflow. No exceptions.

If Playwright MCP is unavailable, stop and fix it before proceeding.
Do NOT fall back to imagined competitors or skipped screenshots.

---

## LOGGING

After the workflow completes, add one line to `/tool-empire-v3/SCREENSHOT_REVIEW_LOG.md`:

```
| [slug] | [YYYY-MM-DD] | PASSED | Clean on first build |
```

Or if fixes were needed:

```
| [slug] | [YYYY-MM-DD] | FIXED | v1: [issues]. v2: [fixes applied]. Final: PASSED |
```

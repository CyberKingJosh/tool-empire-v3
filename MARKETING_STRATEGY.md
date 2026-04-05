# MARKETING STRATEGY — COMPLETE PLAN
# Zero paid advertising. Everything organic.
# Target: $1,000,000 AUD/month at full portfolio maturity.

---

## THE REVENUE STACK (how you actually hit $1M/month)

Layer 1 — Tier Zero volume tools (time, date, converters)
These get 10-200 million searches per month each.
3 AdSense slots per page × massive traffic = bulk of revenue.
Example: world clock tool, 20M visitors, 3 slots, $3 RPM = $180,000/month.
Build 50-100 of these and they alone push $500,000-$900,000/month at maturity.

Layer 2 — Tier One high RPM tools (finance, property, legal)
$20-40 RPM means each visitor is worth 10x more than a time tool visitor.
Lower volume but higher value. Adds $100,000-$200,000/month at maturity.

Layer 3 — Tier Two AI tools (build NOW before competition arrives)
Fastest growing search category in 2026. Low existing competition.
Medium RPM $8-15. Adds $50,000-$100,000/month.

Layer 4 — $1 AUD exports (invoice gen, CV builder, contracts)
Even 10,000 downloads/month = $10,000 AUD. At 100,000 = $100,000.
Pure incremental revenue on top of AdSense.

Layer 5 — Pro subscriptions ($15-19/month)
Tools people use daily: plagiarism checker, paraphrasing, rank tracker.
1,000 subscribers at $15/month = $15,000/month recurring.
5,000 subscribers = $75,000/month recurring.

Layer 6 — Affiliates
One relevant product per tool page. Finance tools → accounting software.
CV builder → LinkedIn Premium. Mortgage calc → broker comparison.
Typical: $20-100 AUD commission per referral.
1,000 referrals/month across portfolio = $20,000-$100,000/month.

---

## MARKETING CHANNEL 1 — GOOGLE SEO (primary long-term driver)

How it works: tools rank on Google, traffic arrives forever, costs nothing.
Timeline: new domain ranks Easy keywords in 6-10 weeks, Medium in 3-4 months.
The Tier Zero tools (time, date, converters) rank fastest because:
- Low competition (most existing sites are outdated and ugly)
- High click-through rate (people click the first result that actually looks good)
- High dwell time (people interact with the tool, Google sees this as quality signal)

SEO Rules: see SEO_RULES.md in full. Non-negotiable rules summary:
- H1 = exact keyword match
- Title = '[Tool Name] Free Online | [Domain]'
- Schema markup on every tool
- Submit every new URL to Search Console on deploy day
- 4 internal links per tool page (builds topical clusters)
- Blog article on each tool page (800-1200 words, same page or linked)

---

## MARKETING CHANNEL 2 — EVERGREEN BLOG CONTENT

Every tool page includes a 300-500 word article below the tool itself.
This article targets an evergreen question related to the tool.
It ranks separately from the tool, bringing additional traffic.
Both the article and the tool have AdSense slots.

Additionally, build a /blog section with longer 800-1,200 word articles.
One article per tool category per month.
These articles rank for longer-tail questions and funnel visitors to tools.

Article formula:
Paragraph 1: answer the question immediately (Google rewards this)
Paragraph 2-4: expand with useful context
Paragraph 5: "Use our free [tool name] to [do the thing] instantly"
Insert tool embed or prominent CTA button here
Paragraph 6-8: additional context, FAQs, related information
Internal links to 3-4 related tools throughout

Best performing article topics per category:
Finance: "How to invoice a client in Australia legally"
Property: "How much can I borrow for a mortgage in Australia"
Legal: "Do freelancers in Australia need a contract"
Health: "How to calculate your calorie deficit for weight loss"
AI: "Claude vs ChatGPT — which is better for [specific task] in 2026"
Time/Date: "How to work out time differences for remote teams"
Education: "How to calculate GPA in Australia vs USA"

---

## MARKETING CHANNEL 3 — REDDIT (fastest early traffic)

Reddit drives traffic immediately — the same day you post.
Google SEO takes weeks. Reddit is instant.
Use Reddit for Tier One tools (invoice gen, CV builder, legal docs)
because these solve real problems people post about on Reddit constantly.

Post formula:
Title: "[Frustration] so I built [thing] — [specific benefit]"
Body: personal story (genuine), what you built, why it is different
Link: included naturally in body, not as a headline
Tone: builder sharing, never marketer promoting

Best subreddits per tool category: see REDDIT_STRATEGY.md

Rules:
Week 1: zero link posts. Only genuine comments and karma building.
Max 2 posts per week. Never same subreddit twice in one week.
Post Tuesday-Thursday 9am-12pm EST for maximum visibility.
Respond to every comment within 2 hours on day of posting.

---

## MARKETING CHANNEL 4 — PRODUCT HUNT

Product Hunt drives 1,000-15,000 visitors on launch day.
Every submission creates a permanent backlink to your domain.
Backlinks accelerate all tool rankings on Google.

Launch calendar:
Month 1 Week 2: "The Free Finance Toolkit" (invoice gen, VAT calc, profit margin)
Month 2: "The Free Legal Document Suite" (NDA, contracts, privacy policy)
Month 3: "The Free Career Toolkit" (CV builder, cover letter, salary calc)
Month 4: "100 Free Tools — No Signup, No BS" (milestone launch)
Every 3-4 weeks thereafter: new suite of 10 tools

Launch day: Tuesday 12:01am Pacific Time
Essential: Maker's Comment posted immediately, respond to every comment same day.

---

## MARKETING CHANNEL 5 — N8N AUTOMATION (distribute everything automatically)

Build this workflow once in N8N. Run it forever.

WORKFLOW: New Tool Published → Auto-distribute to 4 platforms

Trigger: new URL appears in your sitemap.xml (check every 6 hours)

Branch 1 — Twitter/X thread:
Generate 5-tweet thread about the tool's use case and problem it solves.
Include tool URL in tweet 5. Schedule for 12pm AEST Tuesday-Thursday.

Branch 2 — LinkedIn post:
Generate professional angle on the same tool. Different from Twitter.
Focus on business use case. Include tool URL. Schedule 9am AEST.

Branch 3 — Reddit draft:
Generate Reddit-style post following the formula above.
Save to a Google Doc for you to review and post manually.
(Never auto-post to Reddit — human review prevents bans.)

Branch 4 — Google Search Console ping:
Automatically submit the new tool URL to Search Console via API.
Eliminates the manual submission step entirely.

Additional N8N workflow: PDF delivery
Trigger: Stripe webhook fires on successful $1 payment
Action 1: pull tool state data from the payment intent metadata
Action 2: send to Puppeteer PDF generation endpoint
Action 3: send PDF via Resend to customer email
Action 4: update Supabase record with delivery status
Total automation: customer pays, receives PDF within 60 seconds, zero manual work.

---

## MARKETING CHANNEL 6 — LINKEDIN OUTREACH (for SaaS validation and early users)

For Tier One document tools (invoice gen, contract gen, CV builder):
Use the validated outreach strategy from the Manus AI research.

Target: freelancers and agency owners on LinkedIn
Message: reference a specific pain point, offer free access, one question only
Volume: 30-50 personalised messages per day
Expected: 5-10 replies per day, 2-3 genuine beta testers per day

Convert beta testers to paid users:
Day 1: give free access, ask one question about their workflow
Day 7: ask for 2-sentence testimonial
Day 14: introduce paid plan as "switching to paid on [date], you get 3 months free if you refer one person before then"
Day 21: referral deadline creates urgency, converts fence-sitters

---

## THE 90-DAY MARKETING PLAN

Week 1-2:
Build and deploy first 20 Tier Zero tools (time zone tools, unit converters)
Submit all URLs to Google Search Console
Apply for Google AdSense (takes 2-4 weeks to approve)
Create Reddit account, begin karma building (no link posts yet)
Create Product Hunt account, begin community engagement

Week 3-4:
First 2 Reddit posts (invoice generator on r/freelance, VAT calc on r/smallbusiness)
Deploy first 10 Tier One tools
First Product Hunt launch: Finance Toolkit
LinkedIn outreach begins: 30 messages/day to freelancers

Month 2:
First organic Google traffic arriving (Easy keywords from Week 1)
AdSense approved and earning first revenue
Build N8N automation workflow
Continue 6 tools per day build pace
Reddit: 2 posts per week rotation
LinkedIn: continue outreach, converting beta testers

Month 3:
100+ tools live and indexed
First Tier Zero tools appearing on Page 1 for low-competition time/date queries
AdSense revenue compounding as more tools rank
First viral tool launched (designed for sharing, not SEO)
Product Hunt: milestone launch "100 Free AI and Calculator Tools"
Revenue target: AUD $500-$2,000/month by end of Month 3

---

## REALISTIC REVENUE MILESTONES

Month 1: AUD $0-$200 (no rankings yet, Reddit referral traffic only)
Month 3: AUD $500-$2,000 (first rankings, first downloads, first subs)
Month 6: AUD $5,000-$20,000 (compounding, 300+ tools ranked)
Month 9: AUD $20,000-$60,000 (Tier Zero tools getting serious traffic)
Month 12: AUD $50,000-$150,000 (portfolio at scale)
Month 18: AUD $200,000-$500,000 (domain authority strong, all tiers earning)
Month 24: AUD $500,000-$1,000,000+ (full maturity, Tier Zero volume at scale)

The ceiling was broken the moment you understood:
One simple tool × 20 million visitors × 3 ad slots × $3 RPM = $180,000/month.
Build 50 tools like that and the maths speaks for itself.

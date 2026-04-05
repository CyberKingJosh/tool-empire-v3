DOMAIN_PURCHASED: YES
DOMAIN_URL: toolsempire.online
DOMAIN_CONNECTED_TO_VERCEL: YES
VERCEL_PROJECT: toolsempire
GITHUB_REPO: CyberKingJosh/tool-empire-v3

All agents deploy with: vercel --prod --archive=tgz
All tools are live at: https://toolsempire.online/tools/[slug]

Agents must:
1. Build and test locally first (npm run build)
2. Commit and push to GitHub (git push origin main)
3. Run: vercel --prod --archive=tgz
4. Run the full SCREENSHOT WORKFLOW from SCREENSHOT_REVIEW.md using the live URL
5. Mark STATUS.md as DEPLOYED

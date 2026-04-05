DOMAIN_PURCHASED: YES
DOMAIN_URL: toolsempire.online
DOMAIN_CONNECTED_TO_VERCEL: NO

Until DOMAIN_CONNECTED_TO_VERCEL is YES, all agents:
1. Run: npm run dev
2. Preview at: http://localhost:3000/tools/[slug]
3. Run the full SCREENSHOT WORKFLOW using localhost URL
4. Mark STATUS.md as BUILT_LOCAL

When the domain is connected to Vercel, update DOMAIN_CONNECTED_TO_VERCEL to YES.
Then agents will:
1. Run: vercel --prod
2. Screenshot the live URL at https://toolsempire.online/tools/[slug]
3. Mark STATUS.md as DEPLOYED

HOW TO CONNECT THE DOMAIN:
1. Go to vercel.com → your project → Settings → Domains
2. Add: toolsempire.online
3. Vercel will give you DNS records (usually an A record or CNAME)
4. Go to your domain registrar (wherever you bought toolsempire.online)
5. Add the DNS records Vercel gave you
6. Wait for DNS propagation (usually 5-30 minutes, can take up to 48 hours)
7. Vercel will show a green checkmark when it's connected
8. Come back here and update DOMAIN_CONNECTED_TO_VERCEL: YES

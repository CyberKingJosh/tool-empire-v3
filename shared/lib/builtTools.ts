// BUILT TOOLS REGISTRY
// Add a tool here THE MOMENT it is deployed to Vercel.
// Never add a tool before it is live.
// RelatedTools component reads this file — only live tools appear as related tools.

export interface BuiltTool {
  name: string
  slug: string
  description: string
  category: 'time' | 'finance' | 'health' | 'legal' | 'writing' | 'seo' | 'property' | 'education' | 'ai' | 'general' | 'converter' | 'math' | 'date' | 'viral'
}

export const BUILT_TOOLS: BuiltTool[] = [
  {
    name: "Free Invoice Generator Australia",
    slug: "invoice-generator-australia",
    description: "Create professional Australian tax invoices with ABN and GST. Download PDF for $1 AUD.",
    category: "finance"
  },
  {
    name: "Free Resume Builder Australia",
    slug: "resume-cv-builder-australia",
    description: "Build a professional Australian resume in minutes. Download PDF for $1 AUD.",
    category: "writing"
  },
  {
    name: "Current Time In London",
    slug: "time-in-london",
    description: "See the exact current time in London with automatic GMT/BST handling.",
    category: "time"
  }
  // ADD EVERY NEW TOOL HERE IMMEDIATELY AFTER DEPLOYING IT
]

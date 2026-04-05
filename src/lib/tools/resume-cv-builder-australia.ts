import { z } from 'zod'

// --- Resume Section Schemas ---

const contactSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(200),
  email: z.string().email('Valid email is required').max(200),
  phone: z.string().max(30).optional().default(''),
  location: z.string().max(200).optional().default(''),
  linkedin: z.string().max(300).optional().default(''),
  website: z.string().max(300).optional().default(''),
})

const summarySchema = z.string().max(2000).optional().default('')

const experienceItemSchema = z.object({
  jobTitle: z.string().max(200).default(''),
  company: z.string().max(200).default(''),
  location: z.string().max(200).optional().default(''),
  startDate: z.string().max(50).default(''),
  endDate: z.string().max(50).default(''),
  current: z.boolean().default(false),
  description: z.string().max(3000).optional().default(''),
})

const educationItemSchema = z.object({
  degree: z.string().max(200).default(''),
  institution: z.string().max(200).default(''),
  location: z.string().max(200).optional().default(''),
  startDate: z.string().max(50).default(''),
  endDate: z.string().max(50).default(''),
  description: z.string().max(1000).optional().default(''),
})

const resumeInputSchema = z.object({
  contact: contactSchema,
  summary: summarySchema,
  experience: z.array(experienceItemSchema).max(20).default([]),
  education: z.array(educationItemSchema).max(10).default([]),
  skills: z.string().max(2000).optional().default(''),
  certifications: z.string().max(2000).optional().default(''),
  referees: z.string().max(500).optional().default(''),
})

export type ResumeInput = z.infer<typeof resumeInputSchema>
export type ContactInfo = z.infer<typeof contactSchema>
export type ExperienceItem = z.infer<typeof experienceItemSchema>
export type EducationItem = z.infer<typeof educationItemSchema>

// --- Completion Score ---

export interface CompletionSection {
  name: string
  complete: boolean
  weight: number
}

export interface ResumeResult {
  contact: ContactInfo
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  certifications: string[]
  referees: string
  completionScore: number
  completionSections: CompletionSection[]
  sectionCount: number
}

/**
 * Calculate resume completion score based on filled sections.
 * Each section has a weight reflecting its importance in Australian hiring.
 */
function calculateCompletion(input: ResumeInput): { score: number; sections: CompletionSection[] } {
  const sections: CompletionSection[] = [
    {
      name: 'Contact Details',
      complete: input.contact.fullName.trim().length > 0 && input.contact.email.trim().length > 0,
      weight: 20,
    },
    {
      name: 'Professional Summary',
      complete: (input.summary ?? '').trim().length >= 20,
      weight: 15,
    },
    {
      name: 'Work Experience',
      complete: input.experience.some(
        (e) => e.jobTitle.trim().length > 0 && e.company.trim().length > 0
      ),
      weight: 25,
    },
    {
      name: 'Education',
      complete: input.education.some(
        (e) => e.degree.trim().length > 0 && e.institution.trim().length > 0
      ),
      weight: 15,
    },
    {
      name: 'Skills',
      complete: (input.skills ?? '').trim().length > 0,
      weight: 15,
    },
    {
      name: 'Certifications',
      complete: (input.certifications ?? '').trim().length > 0,
      weight: 5,
    },
    {
      name: 'Referees',
      complete: (input.referees ?? '').trim().length > 0,
      weight: 5,
    },
  ]

  const totalWeight = sections.reduce((sum, s) => sum + s.weight, 0)
  const earnedWeight = sections
    .filter((s) => s.complete)
    .reduce((sum, s) => sum + s.weight, 0)

  const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0

  return { score, sections }
}

/**
 * Parse comma or newline-separated skill/certification lists into arrays.
 */
function parseList(text: string): string[] {
  if (!text.trim()) return []
  return text
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .slice(0, 50) // cap at 50 items
}

/**
 * Pure function: takes resume input, validates, returns structured result.
 * No React. No side effects.
 */
export function buildResume(input: ResumeInput): ResumeResult | null {
  const parsed = resumeInputSchema.safeParse(input)
  if (!parsed.success) return null

  const data = parsed.data

  // Must have at least a name and email
  if (!data.contact.fullName.trim() || !data.contact.email.trim()) return null

  const skills = parseList(data.skills ?? '')
  const certifications = parseList(data.certifications ?? '')
  const { score, sections } = calculateCompletion(data)

  let sectionCount = 1 // contact always present
  if ((data.summary ?? '').trim()) sectionCount++
  if (data.experience.some((e) => e.jobTitle.trim())) sectionCount++
  if (data.education.some((e) => e.degree.trim())) sectionCount++
  if (skills.length > 0) sectionCount++
  if (certifications.length > 0) sectionCount++
  if ((data.referees ?? '').trim()) sectionCount++

  return {
    contact: data.contact,
    summary: data.summary ?? '',
    experience: data.experience.filter((e) => e.jobTitle.trim() || e.company.trim()),
    education: data.education.filter((e) => e.degree.trim() || e.institution.trim()),
    skills,
    certifications,
    referees: data.referees ?? '',
    completionScore: score,
    completionSections: sections,
    sectionCount,
  }
}

export { resumeInputSchema, contactSchema, experienceItemSchema, educationItemSchema }

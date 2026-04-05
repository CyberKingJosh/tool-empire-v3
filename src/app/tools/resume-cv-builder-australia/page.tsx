'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import ToolLayout from '../../../../shared/components/ToolLayout'
import ToolInput from '../../../../shared/components/ToolInput'
import StripeExport from '../../../../shared/components/StripeExport'
import ProUpgrade from '../../../../shared/components/ProUpgrade'
import RelatedTools from '../../../../shared/components/RelatedTools'
import {
  buildResume,
  type ResumeInput,
  type ResumeResult,
  type ExperienceItem,
  type EducationItem,
  type CompletionSection,
} from '../../../lib/tools/resume-cv-builder-australia'

// Writing palette
const PALETTE = {
  primary: '#8B2FC9',
  accent: '#6225A0',
  surface: '#FBF8FF',
  text: '#1A0A2E',
  result: '#E8A838',
} as const

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ''


// --- Speedometer Completion Ring ---

function CompletionRing({ score, sections }: { score: number; sections: CompletionSection[] }) {
  const [displayScore, setDisplayScore] = useState(0)
  const prevScoreRef = useRef(0)

  useEffect(() => {
    const start = prevScoreRef.current
    const end = score
    prevScoreRef.current = score

    if (start === end) {
      setDisplayScore(end)
      return
    }

    const duration = 600
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(start + (end - start) * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [score])

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (displayScore / 100) * circumference

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', width: 130, height: 130, flexShrink: 0 }}>
        <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="65" cy="65" r={radius}
            fill="none"
            stroke={`${PALETTE.accent}20`}
            strokeWidth="10"
          />
          <circle
            cx="65" cy="65" r={radius}
            fill="none"
            stroke={displayScore >= 80 ? PALETTE.result : PALETTE.primary}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke 300ms ease' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: displayScore >= 80 ? PALETTE.result : PALETTE.primary,
              fontFamily: "'DM Mono', monospace",
              lineHeight: 1,
              transition: 'color 300ms ease',
            }}
          >
            {displayScore}%
          </span>
          <span style={{ fontSize: 11, color: PALETTE.text, opacity: 0.6, marginTop: 2 }}>
            Complete
          </span>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 160 }}>
        {sections.map((section) => (
          <div
            key={section.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 4,
              fontSize: 13,
              color: PALETTE.text,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                backgroundColor: section.complete ? PALETTE.result : `${PALETTE.accent}15`,
                color: section.complete ? '#FFF' : PALETTE.text,
                transition: 'background-color 300ms ease, color 300ms ease',
                flexShrink: 0,
              }}
            >
              {section.complete ? '\u2713' : '\u00b7'}
            </span>
            <span style={{ opacity: section.complete ? 1 : 0.5 }}>{section.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Experience Item Form ---

function ExperienceForm({
  item,
  index,
  onChange,
  onRemove,
  canRemove,
}: {
  item: ExperienceItem
  index: number
  onChange: (index: number, field: keyof ExperienceItem, value: string | boolean) => void
  onRemove: (index: number) => void
  canRemove: boolean
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 10,
        border: '1px solid #E2E8F0',
        marginBottom: 12,
        backgroundColor: '#FFF',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.primary }}>
          Position {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            style={{
              border: 'none',
              background: 'none',
              color: '#DC2626',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 0, columnGap: 12 }}>
        <ToolInput
          label="Job Title"
          value={item.jobTitle}
          onChange={(e) => onChange(index, 'jobTitle', e.currentTarget.value)}
          placeholder="e.g. Senior Software Engineer"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
        <ToolInput
          label="Company"
          value={item.company}
          onChange={(e) => onChange(index, 'company', e.currentTarget.value)}
          placeholder="e.g. Atlassian"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 0, columnGap: 12 }}>
        <ToolInput
          label="Location"
          value={item.location ?? ''}
          onChange={(e) => onChange(index, 'location', e.currentTarget.value)}
          placeholder="e.g. Sydney, NSW"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
        <ToolInput
          label="Start Date"
          value={item.startDate}
          onChange={(e) => onChange(index, 'startDate', e.currentTarget.value)}
          placeholder="e.g. Jan 2022"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
        <ToolInput
          label="End Date"
          value={item.current ? 'Present' : item.endDate}
          onChange={(e) => onChange(index, 'endDate', e.currentTarget.value)}
          placeholder="e.g. Dec 2024"
          disabled={item.current}
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
      </div>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          fontWeight: 600,
          color: PALETTE.primary,
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        <input
          type="checkbox"
          checked={item.current}
          onChange={(e) => onChange(index, 'current', e.target.checked)}
          style={{ width: 16, height: 16, accentColor: PALETTE.accent }}
        />
        I currently work here
      </label>
      <div>
        <label
          htmlFor={`exp-desc-${index}`}
          style={{ display: 'block', fontSize: 14, fontWeight: 600, color: PALETTE.primary, marginBottom: 6 }}
        >
          Key Responsibilities & Achievements
        </label>
        <textarea
          id={`exp-desc-${index}`}
          value={item.description ?? ''}
          onChange={(e) => onChange(index, 'description', e.target.value)}
          placeholder="e.g. Led a team of 5 engineers to deliver a microservices migration, reducing latency by 40%"
          rows={3}
          style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            borderRadius: 10,
            border: '1px solid #E2E8F0',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            lineHeight: 1.5,
          }}
        />
      </div>
    </div>
  )
}

// --- Education Item Form ---

function EducationForm({
  item,
  index,
  onChange,
  onRemove,
  canRemove,
}: {
  item: EducationItem
  index: number
  onChange: (index: number, field: keyof EducationItem, value: string) => void
  onRemove: (index: number) => void
  canRemove: boolean
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 10,
        border: '1px solid #E2E8F0',
        marginBottom: 12,
        backgroundColor: '#FFF',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: PALETTE.primary }}>
          Qualification {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            style={{ border: 'none', background: 'none', color: '#DC2626', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Remove
          </button>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 0, columnGap: 12 }}>
        <ToolInput
          label="Degree / Qualification"
          value={item.degree}
          onChange={(e) => onChange(index, 'degree', e.currentTarget.value)}
          placeholder="e.g. Bachelor of Computer Science"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
        <ToolInput
          label="Institution"
          value={item.institution}
          onChange={(e) => onChange(index, 'institution', e.currentTarget.value)}
          placeholder="e.g. University of Melbourne"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 0, columnGap: 12 }}>
        <ToolInput
          label="Location"
          value={item.location ?? ''}
          onChange={(e) => onChange(index, 'location', e.currentTarget.value)}
          placeholder="e.g. Melbourne, VIC"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
        <ToolInput
          label="Start Year"
          value={item.startDate}
          onChange={(e) => onChange(index, 'startDate', e.currentTarget.value)}
          placeholder="e.g. 2018"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
        <ToolInput
          label="End Year"
          value={item.endDate}
          onChange={(e) => onChange(index, 'endDate', e.currentTarget.value)}
          placeholder="e.g. 2022"
          accentColor={PALETTE.accent}
          primaryColor={PALETTE.primary}
        />
      </div>
    </div>
  )
}

// --- Live Resume Preview ---

function ResumePreview({ result }: { result: ResumeResult }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: '#FFF',
        border: `2px solid ${PALETTE.accent}`,
        borderRadius: 16,
        padding: 'clamp(20px, 4vw, 40px)',
        marginTop: 24,
        fontFamily: "'DM Sans', sans-serif",
        animation: 'resultEntrance 250ms ease-out',
        maxWidth: 800,
      }}
    >
      <style>{`
        @keyframes resultEntrance {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Header — Name & Contact */}
      <div style={{ borderBottom: `3px solid ${PALETTE.primary}`, paddingBottom: 16, marginBottom: 20 }}>
        <h2
          style={{
            fontSize: 'clamp(22px, 5vw, 32px)',
            fontWeight: 800,
            color: PALETTE.primary,
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: -0.5,
          }}
        >
          {result.contact.fullName}
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 16px',
            marginTop: 8,
            fontSize: 13,
            color: PALETTE.text,
            opacity: 0.75,
          }}
        >
          {result.contact.email && <span>{result.contact.email}</span>}
          {result.contact.phone && <span>{result.contact.phone}</span>}
          {result.contact.location && <span>{result.contact.location}</span>}
          {result.contact.linkedin && <span>{result.contact.linkedin}</span>}
          {result.contact.website && <span>{result.contact.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {result.summary.trim() && (
        <section style={{ marginBottom: 20 }}>
          <h3 style={sectionHeadingStyle}>Professional Summary</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: PALETTE.text, margin: 0, whiteSpace: 'pre-wrap' }}>
            {result.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {result.experience.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h3 style={sectionHeadingStyle}>Work Experience</h3>
          {result.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: PALETTE.text, margin: 0 }}>
                  {exp.jobTitle}{exp.company ? ` — ${exp.company}` : ''}
                </p>
                <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.6, margin: 0, whiteSpace: 'nowrap' }}>
                  {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}
                  {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
              {exp.location && (
                <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.6, margin: '2px 0 0' }}>
                  {exp.location}
                </p>
              )}
              {exp.description && (
                <p style={{ fontSize: 14, lineHeight: 1.55, color: PALETTE.text, margin: '6px 0 0', whiteSpace: 'pre-wrap' }}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {result.education.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h3 style={sectionHeadingStyle}>Education</h3>
          {result.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: PALETTE.text, margin: 0 }}>
                  {edu.degree}{edu.institution ? ` — ${edu.institution}` : ''}
                </p>
                <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.6, margin: 0, whiteSpace: 'nowrap' }}>
                  {edu.startDate}{edu.startDate && edu.endDate ? ' – ' : ''}{edu.endDate}
                </p>
              </div>
              {edu.location && (
                <p style={{ fontSize: 13, color: PALETTE.text, opacity: 0.6, margin: '2px 0 0' }}>
                  {edu.location}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {result.skills.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h3 style={sectionHeadingStyle}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {result.skills.map((skill, i) => (
              <span
                key={i}
                style={{
                  padding: '4px 12px',
                  borderRadius: 20,
                  backgroundColor: `${PALETTE.primary}10`,
                  color: PALETTE.primary,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {result.certifications.length > 0 && (
        <section style={{ marginBottom: 20 }}>
          <h3 style={sectionHeadingStyle}>Certifications</h3>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {result.certifications.map((cert, i) => (
              <li key={i} style={{ fontSize: 14, color: PALETTE.text, marginBottom: 4 }}>
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Referees */}
      {result.referees.trim() && (
        <section>
          <h3 style={sectionHeadingStyle}>Referees</h3>
          <p style={{ fontSize: 14, color: PALETTE.text, opacity: 0.8, margin: 0, whiteSpace: 'pre-wrap' }}>
            {result.referees}
          </p>
        </section>
      )}
    </div>
  )
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: PALETTE.primary,
  textTransform: 'uppercase' as const,
  letterSpacing: 1.5,
  borderBottom: `1px solid ${PALETTE.accent}30`,
  paddingBottom: 6,
  marginBottom: 12,
  marginTop: 0,
}

// --- Collapsible Section ---

function FormSection({
  title,
  defaultOpen,
  children,
}: {
  title: string
  defaultOpen: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ marginBottom: 8 }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0',
          background: 'none',
          border: 'none',
          borderBottom: `1px solid ${PALETTE.accent}20`,
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 700,
          color: PALETTE.primary,
          textAlign: 'left',
        }}
      >
        {title}
        <span style={{ fontSize: 18, transition: 'transform 200ms ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          {'\u25BE'}
        </span>
      </button>
      {open && <div style={{ paddingTop: 12 }}>{children}</div>}
    </div>
  )
}

// --- Empty State ---

function EmptyPreview() {
  return (
    <div
      style={{
        backgroundColor: PALETTE.surface,
        border: `2px dashed ${PALETTE.accent}30`,
        borderRadius: 16,
        padding: 'clamp(24px, 5vw, 48px)',
        marginTop: 24,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>
        {'\u{1F4C4}'}
      </div>
      <p style={{ fontSize: 16, fontWeight: 600, color: PALETTE.text, opacity: 0.5, margin: 0 }}>
        Fill in your details above to see your resume preview here
      </p>
      <p style={{ fontSize: 14, color: PALETTE.text, opacity: 0.35, marginTop: 8 }}>
        Start with your name and email — the preview updates live as you type
      </p>
    </div>
  )
}

// --- Main Page ---

const emptyExperience = (): ExperienceItem => ({
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
})

const emptyEducation = (): EducationItem => ({
  degree: '',
  institution: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
})

export default function ResumeCvBuilderAustraliaPage() {
  // Contact
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [website, setWebsite] = useState('')

  // Summary
  const [summary, setSummary] = useState('')

  // Experience
  const [experience, setExperience] = useState<ExperienceItem[]>([emptyExperience()])

  // Education
  const [education, setEducation] = useState<EducationItem[]>([emptyEducation()])

  // Skills, Certs, Referees
  const [skills, setSkills] = useState('')
  const [certifications, setCertifications] = useState('')
  const [referees, setReferees] = useState('')

  // Result
  const [result, setResult] = useState<ResumeResult | null>(null)

  // Build resume on every change (live preview)
  const buildLive = useCallback(() => {
    if (!fullName.trim() || !email.trim()) {
      setResult(null)
      return
    }

    const input: ResumeInput = {
      contact: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone,
        location,
        linkedin,
        website,
      },
      summary,
      experience,
      education,
      skills,
      certifications,
      referees,
    }

    const built = buildResume(input)
    setResult(built)
  }, [fullName, email, phone, location, linkedin, website, summary, experience, education, skills, certifications, referees])

  useEffect(() => {
    buildLive()
  }, [buildLive])

  // Experience handlers
  const handleExpChange = useCallback((index: number, field: keyof ExperienceItem, value: string | boolean) => {
    setExperience((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }, [])

  const addExperience = useCallback(() => {
    setExperience((prev) => [...prev, emptyExperience()])
  }, [])

  const removeExperience = useCallback((index: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== index))
  }, [])

  // Education handlers
  const handleEduChange = useCallback((index: number, field: keyof EducationItem, value: string) => {
    setEducation((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }, [])

  const addEducation = useCallback(() => {
    setEducation((prev) => [...prev, emptyEducation()])
  }, [])

  const removeEducation = useCallback((index: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== index))
  }, [])

  // Completion data for the ring (even when no full result)
  const completionInput: ResumeInput = {
    contact: { fullName, email, phone, location, linkedin, website },
    summary,
    experience,
    education,
    skills,
    certifications,
    referees,
  }
  const tempResult = buildResume(completionInput)

  return (
    <ToolLayout
      title="Resume CV Builder Australia Free Online | Tool Empire"
      description="Free resume cv builder australia. Build a professional ATS-friendly resume with Australian formatting. No signup. Instant results."
      canonical={`${BASE_URL}/tools/resume-cv-builder-australia`}
      schemaType="HowTo"
      toolCategory="writing"
      tier={1}
      h1="Free Resume Builder Australia"
      oneLiner="Build a professional, ATS-friendly Australian resume in minutes. Preview free on screen, download as PDF for $1 AUD."
      logoPath="/logos/resume-cv-builder-australia.png"
      schemaData={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to build a free Australian resume online',
        description: 'Create a professional ATS-friendly resume with Australian formatting. No signup required.',
        step: [
          { '@type': 'HowToStep', name: 'Enter your contact details', text: 'Fill in your name, email, phone, and location' },
          { '@type': 'HowToStep', name: 'Add experience and education', text: 'Enter your work history and qualifications' },
          { '@type': 'HowToStep', name: 'Add skills and certifications', text: 'List your key skills and professional certifications' },
          { '@type': 'HowToStep', name: 'Preview and download', text: 'See your live resume preview and download as PDF for $1 AUD' },
        ],
      }}
    >
      {/* ===== COMPLETION RING (above input on mobile) ===== */}
      <div
        style={{
          backgroundColor: '#FFF',
          border: `1px solid ${PALETTE.accent}33`,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: 'clamp(12px, 3vw, 20px)',
          marginBottom: 16,
        }}
      >
        <CompletionRing
          score={tempResult?.completionScore ?? 0}
          sections={tempResult?.completionSections ?? [
            { name: 'Contact Details', complete: false, weight: 20 },
            { name: 'Professional Summary', complete: false, weight: 15 },
            { name: 'Work Experience', complete: false, weight: 25 },
            { name: 'Education', complete: false, weight: 15 },
            { name: 'Skills', complete: false, weight: 15 },
            { name: 'Certifications', complete: false, weight: 5 },
            { name: 'Referees', complete: false, weight: 5 },
          ]}
        />
      </div>

      {/* ===== TOOL INPUT CARD ===== */}
      <div
        style={{
          backgroundColor: '#FFF',
          border: `1px solid ${PALETTE.accent}33`,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: 'clamp(16px, 3vw, 24px)',
        }}
      >
        {/* --- Contact Details --- */}
        <FormSection title="Contact Details" defaultOpen={true}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, columnGap: 16 }}>
            <ToolInput
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.currentTarget.value)}
              placeholder="e.g. Sarah Mitchell"
              accentColor={PALETTE.accent}
              primaryColor={PALETTE.primary}
            />
            <ToolInput
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="e.g. sarah.mitchell@gmail.com"
              type="email"
              accentColor={PALETTE.accent}
              primaryColor={PALETTE.primary}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, columnGap: 16 }}>
            <ToolInput
              label="Phone (optional)"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              placeholder="e.g. 0412 345 678"
              type="tel"
              accentColor={PALETTE.accent}
              primaryColor={PALETTE.primary}
            />
            <ToolInput
              label="Location (optional)"
              value={location}
              onChange={(e) => setLocation(e.currentTarget.value)}
              placeholder="e.g. Sydney, NSW"
              accentColor={PALETTE.accent}
              primaryColor={PALETTE.primary}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, columnGap: 16 }}>
            <ToolInput
              label="LinkedIn (optional)"
              value={linkedin}
              onChange={(e) => setLinkedin(e.currentTarget.value)}
              placeholder="e.g. linkedin.com/in/sarah-mitchell"
              accentColor={PALETTE.accent}
              primaryColor={PALETTE.primary}
            />
            <ToolInput
              label="Website / Portfolio (optional)"
              value={website}
              onChange={(e) => setWebsite(e.currentTarget.value)}
              placeholder="e.g. sarahmitchell.dev"
              accentColor={PALETTE.accent}
              primaryColor={PALETTE.primary}
            />
          </div>
        </FormSection>

        {/* --- Professional Summary --- */}
        <FormSection title="Professional Summary" defaultOpen={true}>
          <div>
            <label
              htmlFor="summary"
              style={{ display: 'block', fontSize: 14, fontWeight: 600, color: PALETTE.primary, marginBottom: 6 }}
            >
              A brief overview of your experience and career goals
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g. Results-driven marketing professional with 8+ years of experience in digital strategy and brand management across Australian and APAC markets..."
              rows={4}
              style={{
                width: '100%',
                padding: 12,
                fontSize: 16,
                borderRadius: 10,
                border: '1px solid #E2E8F0',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                lineHeight: 1.5,
              }}
            />
          </div>
        </FormSection>

        {/* --- Work Experience --- */}
        <FormSection title="Work Experience" defaultOpen={true}>
          {experience.map((exp, i) => (
            <ExperienceForm
              key={i}
              item={exp}
              index={i}
              onChange={handleExpChange}
              onRemove={removeExperience}
              canRemove={experience.length > 1}
            />
          ))}
          <button
            type="button"
            onClick={addExperience}
            style={{
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 600,
              color: PALETTE.accent,
              backgroundColor: 'transparent',
              border: `1px dashed ${PALETTE.accent}60`,
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            + Add Another Position
          </button>
        </FormSection>

        {/* --- Education --- */}
        <FormSection title="Education" defaultOpen={false}>
          {education.map((edu, i) => (
            <EducationForm
              key={i}
              item={edu}
              index={i}
              onChange={handleEduChange}
              onRemove={removeEducation}
              canRemove={education.length > 1}
            />
          ))}
          <button
            type="button"
            onClick={addEducation}
            style={{
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 600,
              color: PALETTE.accent,
              backgroundColor: 'transparent',
              border: `1px dashed ${PALETTE.accent}60`,
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            + Add Another Qualification
          </button>
        </FormSection>

        {/* --- Skills --- */}
        <FormSection title="Skills" defaultOpen={false}>
          <div>
            <label
              htmlFor="skills"
              style={{ display: 'block', fontSize: 14, fontWeight: 600, color: PALETTE.primary, marginBottom: 6 }}
            >
              Enter skills separated by commas
            </label>
            <textarea
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Project Management, Python, Data Analysis, Stakeholder Engagement, Agile Methodology"
              rows={3}
              style={{
                width: '100%',
                padding: 12,
                fontSize: 16,
                borderRadius: 10,
                border: '1px solid #E2E8F0',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                lineHeight: 1.5,
              }}
            />
          </div>
        </FormSection>

        {/* --- Certifications --- */}
        <FormSection title="Certifications (optional)" defaultOpen={false}>
          <div>
            <label
              htmlFor="certifications"
              style={{ display: 'block', fontSize: 14, fontWeight: 600, color: PALETTE.primary, marginBottom: 6 }}
            >
              Enter certifications separated by commas
            </label>
            <textarea
              id="certifications"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              placeholder="e.g. AWS Certified Solutions Architect, PMP, Google Analytics Certified"
              rows={2}
              style={{
                width: '100%',
                padding: 12,
                fontSize: 16,
                borderRadius: 10,
                border: '1px solid #E2E8F0',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                lineHeight: 1.5,
              }}
            />
          </div>
        </FormSection>

        {/* --- Referees --- */}
        <FormSection title="Referees (optional)" defaultOpen={false}>
          <div>
            <label
              htmlFor="referees"
              style={{ display: 'block', fontSize: 14, fontWeight: 600, color: PALETTE.primary, marginBottom: 6 }}
            >
              Referee details or &quot;Available upon request&quot;
            </label>
            <textarea
              id="referees"
              value={referees}
              onChange={(e) => setReferees(e.target.value)}
              placeholder="e.g. Available upon request"
              rows={2}
              style={{
                width: '100%',
                padding: 12,
                fontSize: 16,
                borderRadius: 10,
                border: '1px solid #E2E8F0',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                lineHeight: 1.5,
              }}
            />
          </div>
        </FormSection>
      </div>

      {/* ===== RESUME PREVIEW ===== */}
      {result ? (
        <div id="resume-preview">
          <ResumePreview result={result} />

          {/* $1 PDF export */}
          <StripeExport
            toolSlug="resume-cv-builder-australia"
            documentTitle={`Resume - ${result.contact.fullName}`}
            accentColor={PALETTE.accent}
            primaryColor={PALETTE.primary}
          />

          {/* Pro upgrade CTA */}
          <ProUpgrade
            toolName="Resume CV Builder Australia"
            primaryColor={PALETTE.primary}
            accentColor={PALETTE.accent}
            surfaceColor={PALETTE.surface}
            monthlyPrice={15}
          />
        </div>
      ) : (
        <EmptyPreview />
      )}

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: PALETTE.primary, marginBottom: 12 }}>
          How It Works
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: PALETTE.text, opacity: 0.85 }}>
          Enter your contact details, work experience, education, and skills using the form above.
          Your resume preview updates live as you type — no need to click a button. The completion
          score tracks which sections are filled so you can build a thorough, ATS-friendly resume.
          When you are happy with the preview, download it as a professionally formatted PDF for
          just $1 AUD. No account or signup required.
        </p>
      </section>

      {/* ===== BLOG ARTICLE (300-500 words) ===== */}
      <article style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: PALETTE.primary, marginBottom: 12 }}>
          How to Write an Australian Resume That Gets Interviews
        </h2>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: PALETTE.text, opacity: 0.85 }}>
          <p style={{ marginBottom: 16 }}>
            An Australian resume (also called a CV) follows different conventions to resumes in the
            United States or United Kingdom. Getting the format right is the first step to making it
            past Applicant Tracking Systems (ATS) and into the hands of a hiring manager.
          </p>
          <p style={{ marginBottom: 16 }}>
            Australian resumes typically do not include a photo, date of birth, marital status, or
            nationality. These are considered unnecessary and can introduce unconscious bias. Instead,
            focus on your contact details (name, email, phone, city and state), a concise professional
            summary, your work history in reverse chronological order, education, and a skills section
            tailored to the role you are applying for.
          </p>
          <p style={{ marginBottom: 16 }}>
            Keep your resume to two to three pages. Graduate roles may need only one page, while
            senior professionals with extensive experience may extend to three. Use clear section
            headings, consistent formatting, and bullet points for achievements rather than lengthy
            paragraphs. Quantify your impact wherever possible — &quot;Increased quarterly revenue by
            22%&quot; is more compelling than &quot;Responsible for revenue growth.&quot;
          </p>
          <p style={{ marginBottom: 16 }}>
            For ATS compatibility, avoid tables, text boxes, headers and footers, and unusual fonts.
            Use standard section headings like &quot;Work Experience,&quot; &quot;Education,&quot;
            and &quot;Skills.&quot; Many Australian employers use ATS software to filter applications
            before a human ever reads them, so matching keywords from the job description is essential.
          </p>
          <p style={{ marginBottom: 16 }}>
            If you are writing cover letters or refining your wording, keep paragraphs concise
            and use action verbs throughout. Focus on achievements rather than duties, and quantify
            results wherever possible — for example, &quot;increased sales by 25%&quot; is far stronger
            than &quot;responsible for sales.&quot;
          </p>
          <p>
            Referees in Australia are typically listed as &quot;Available upon request&quot; unless
            the job advertisement specifically asks for them. Always notify your referees before
            listing them, and choose people who can speak to your relevant skills and work ethic.
          </p>
        </div>
      </article>

      {/* ===== AFFILIATE BOX =====
          Affiliate program: https://www.grammarly.com/affiliates (via Impact.com)
          Commission: 20% recurring on Premium subscriptions
          When approved, replace href below with your Impact tracking link */}
      <div style={{ border: '1px solid rgba(139,47,201,0.2)', borderRadius: '12px', padding: '20px', marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FBF8FF', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
          <img
            src="https://logo.clearbit.com/grammarly.com"
            alt="Grammarly logo"
            width={40}
            height={40}
            style={{ borderRadius: '8px', flexShrink: 0 }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Sponsored</div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#8B2FC9', marginBottom: '4px' }}>Grammarly Premium</div>
            <div style={{ fontSize: '14px', color: '#475569' }}>AI writing assistant that checks grammar, tone and clarity. Perfect for polishing your resume before applying.</div>
          </div>
        </div>
        <a
          href="https://www.grammarly.com"
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{ backgroundColor: '#8B2FC9', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Try Free
        </a>
      </div>

      {/* ===== RELATED TOOLS ===== */}
      <RelatedTools currentSlug="resume-cv-builder-australia" category="writing" />
    </ToolLayout>
  )
}

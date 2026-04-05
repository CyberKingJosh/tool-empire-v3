'use client'

import { useState, useCallback, useMemo } from 'react'
import ToolLayout from '../../../../shared/components/ToolLayout'
import RelatedTools from '../../../../shared/components/RelatedTools'
import {
  countTokens,
  formatTokenCount,
  formatCostAUD,
  formatContextPercent,
  LLM_MODELS,
  type TokenCounterResult,
  type ModelTokenResult,
} from '../../../lib/tools/ai-token-counter'

// AI & Tech palette (DESIGN_SYSTEM.md)
const P = {
  primary: '#0D1117',
  accent: '#58A6FF',
  surface: '#161B22',
  text: '#C9D1D9',
  result: '#3FB950',
  border: '#30363D',
  muted: '#8B949E',
  cardBg: '#0D1117',
  inputBg: '#0D1117',
} as const

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ''

const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontVariantNumeric: 'tabular-nums',
}

// --- Blinking cursor component (unforgettable detail) ---
function TerminalCursor() {
  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      <span
        style={{
          display: 'inline-block',
          width: 2,
          height: '1em',
          backgroundColor: P.result,
          marginLeft: 4,
          verticalAlign: 'text-bottom',
          animation: 'blink 1s step-end infinite',
        }}
        aria-hidden="true"
      />
    </>
  )
}

// --- Model result row ---
function ModelRow({ result, index }: { result: ModelTokenResult; index: number }) {
  const providerColors: Record<string, string> = {
    OpenAI: '#10A37F',
    Anthropic: '#D97706',
    Google: '#4285F4',
    Meta: '#0668E1',
  }
  const color = providerColors[result.model.provider] ?? P.accent

  return (
    <tr
      style={{
        borderBottom: `1px solid ${P.border}`,
        animation: `fadeRow 200ms ease ${index * 30}ms both`,
      }}
    >
      <td style={{ padding: '10px 12px', fontSize: 14, ...MONO }}>
        <span style={{ color, fontWeight: 600 }}>{result.model.name}</span>
        <span style={{ color: P.muted, fontSize: 12, marginLeft: 8 }}>
          {result.model.provider}
        </span>
      </td>
      <td style={{ padding: '10px 12px', fontSize: 16, fontWeight: 700, color: P.result, textAlign: 'right', ...MONO }}>
        {formatTokenCount(result.tokenCount)}
      </td>
      <td style={{ padding: '10px 12px', fontSize: 13, color: P.text, textAlign: 'right', ...MONO }}>
        {formatCostAUD(result.inputCostUSD)}
      </td>
      <td
        style={{
          padding: '10px 12px',
          fontSize: 13,
          textAlign: 'right',
          ...MONO,
        }}
      >
        <span
          style={{
            color: result.percentOfContext > 50 ? '#F85149' : result.percentOfContext > 25 ? '#D29922' : P.muted,
          }}
        >
          {formatContextPercent(result.percentOfContext)}
        </span>
      </td>
    </tr>
  )
}

// --- Main page ---
export default function AITokenCounterPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<TokenCounterResult | null>(null)

  const liveStats = useMemo(() => {
    const chars = text.length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split('\n').length : 0
    return { chars, words, lines }
  }, [text])

  const handleCount = useCallback(() => {
    if (!text.trim()) return
    const r = countTokens({ text })
    setResult(r)
  }, [text])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleCount()
      }
    },
    [handleCount]
  )

  const shareUrl = result
    ? `${BASE_URL}/tools/ai-token-counter?chars=${result.charCount}`
    : undefined

  return (
    <ToolLayout
      title="AI Token Counter Free Online | Tools Empire"
      description="Free AI token counter. Count tokens for ChatGPT, Claude, Gemini, and Llama models instantly. See costs per model. No signup. Instant results."
      canonical={`${BASE_URL}/tools/ai-token-counter`}
      schemaType="SoftwareApplication"
      toolCategory="ai"
      tier={0}
      h1="AI Token Counter"
      oneLiner="Count tokens and estimate costs for ChatGPT, Claude, Gemini, and Llama — all models compared instantly."
      logoPath={null}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        @keyframes fadeRow {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes resultSlideIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Tool Input Card */}
      <div
        style={{
          backgroundColor: P.surface,
          border: `1px solid ${P.border}`,
          borderRadius: 12,
          padding: 'clamp(16px, 4vw, 24px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {/* Live stats bar */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 8,
            fontSize: 13,
            color: P.muted,
            ...MONO,
          }}
        >
          <span>{liveStats.chars.toLocaleString('en-AU')} chars</span>
          <span>{liveStats.words.toLocaleString('en-AU')} words</span>
          <span>{liveStats.lines.toLocaleString('en-AU')} lines</span>
        </div>

        {/* Text input */}
        <label
          htmlFor="token-input"
          style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 600,
            color: P.accent,
            marginBottom: 6,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Paste your text or prompt
        </label>
        <textarea
          id="token-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your prompt, article, or code here to count tokens across all major AI models..."
          rows={6}
          style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            minHeight: 120,
            borderRadius: 8,
            border: `1px solid ${P.border}`,
            backgroundColor: P.inputBg,
            color: P.text,
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 150ms ease',
            boxSizing: 'border-box',
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.6,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = P.accent
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = P.border
          }}
        />

        {/* Count button */}
        <button
          onClick={handleCount}
          disabled={!text.trim()}
          style={{
            marginTop: 12,
            width: '100%',
            padding: '14px 24px',
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#FFFFFF',
            backgroundColor: text.trim() ? P.accent : P.border,
            border: 'none',
            borderRadius: 8,
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            transition: 'background-color 200ms ease, transform 100ms ease',
          }}
          onMouseDown={(e) => {
            if (text.trim()) e.currentTarget.style.transform = 'scale(0.97)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Count Tokens
          <span style={{ fontSize: 13, fontWeight: 400, marginLeft: 8, opacity: 0.7 }}>
            ⌘+Enter
          </span>
        </button>
      </div>

      {/* Results */}
      {result && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: 24,
            animation: 'resultSlideIn 250ms ease-out',
          }}
        >
          {/* Terminal-style summary */}
          <div
            style={{
              backgroundColor: P.cardBg,
              border: `2px solid ${P.accent}`,
              borderRadius: 12,
              padding: 'clamp(16px, 4vw, 24px)',
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 13, color: P.muted, marginBottom: 8, ...MONO }}>
              {'>'} token_count --all-models
            </div>
            <div
              style={{
                fontSize: 'clamp(28px, 6vw, 48px)',
                fontWeight: 700,
                color: P.result,
                lineHeight: 1.1,
                ...MONO,
              }}
            >
              {formatTokenCount(result.modelResults[0]?.tokenCount ?? 0)}
              <span style={{ fontSize: 16, color: P.muted, marginLeft: 8 }}>
                tokens (GPT-4o)
              </span>
              <TerminalCursor />
            </div>
            <div
              style={{
                display: 'flex',
                gap: 24,
                marginTop: 12,
                fontSize: 14,
                color: P.muted,
                flexWrap: 'wrap',
                ...MONO,
              }}
            >
              <span>{result.charCount.toLocaleString('en-AU')} characters</span>
              <span>{result.wordCount.toLocaleString('en-AU')} words</span>
              <span>{result.lineCount.toLocaleString('en-AU')} lines</span>
            </div>
          </div>

          {/* Model comparison table */}
          <div
            style={{
              backgroundColor: P.surface,
              border: `1px solid ${P.border}`,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderBottom: `1px solid ${P.border}`,
                fontSize: 14,
                fontWeight: 600,
                color: P.accent,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              All Models Compared
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: 500,
                }}
              >
                <thead>
                  <tr style={{ borderBottom: `1px solid ${P.border}` }}>
                    <th
                      style={{
                        padding: '10px 12px',
                        textAlign: 'left',
                        fontSize: 12,
                        fontWeight: 600,
                        color: P.muted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...MONO,
                      }}
                    >
                      Model
                    </th>
                    <th
                      style={{
                        padding: '10px 12px',
                        textAlign: 'right',
                        fontSize: 12,
                        fontWeight: 600,
                        color: P.muted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...MONO,
                      }}
                    >
                      Tokens
                    </th>
                    <th
                      style={{
                        padding: '10px 12px',
                        textAlign: 'right',
                        fontSize: 12,
                        fontWeight: 600,
                        color: P.muted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...MONO,
                      }}
                    >
                      Input Cost
                    </th>
                    <th
                      style={{
                        padding: '10px 12px',
                        textAlign: 'right',
                        fontSize: 12,
                        fontWeight: 600,
                        color: P.muted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...MONO,
                      }}
                    >
                      Context Used
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.modelResults.map((r, i) => (
                    <ModelRow key={r.model.id} result={r} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
            <div
              style={{
                padding: '10px 16px',
                borderTop: `1px solid ${P.border}`,
                fontSize: 12,
                color: P.muted,
                ...MONO,
              }}
            >
              Costs shown in AUD (1 USD ≈ 1.55 AUD). Token counts are estimates based on average tokenizer ratios.
            </div>
          </div>

          {/* Copy / Share buttons */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <CopyButton result={result} />
            {shareUrl && <ShareButton url={shareUrl} />}
          </div>
        </div>
      )}

      {/* How it works */}
      <section style={{ marginTop: 48 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: P.accent,
            marginBottom: 12,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          How Token Counting Works
        </h2>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: P.text, opacity: 0.85 }}>
          <p style={{ marginBottom: 12 }}>
            AI models process text by splitting it into tokens — small pieces that can be individual
            words, parts of words, or even single characters. Different models use different
            tokenizers, which means the same text produces different token counts depending on the
            model.
          </p>
          <p style={{ marginBottom: 12 }}>
            GPT-4o and GPT-3.5 use the cl100k_base tokenizer, which averages about 1 token per 4
            English characters. Claude models use a slightly different tokenizer that tends to produce
            about 1 token per 3.5 characters. This tool estimates token counts using these published
            ratios and calculates the cost based on each provider&apos;s current pricing.
          </p>
          <p>
            For exact token counts in production, use each provider&apos;s official tokenizer library.
            This tool gives you a fast, reliable estimate across all major models at once — perfect
            for budgeting and comparing costs before committing to a provider.
          </p>
        </div>
      </section>

      {/* Blog article */}
      <article style={{ marginTop: 48 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: P.accent,
            marginBottom: 12,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          What Is an AI Token and Why Does It Matter?
        </h2>
        <div style={{ fontSize: 16, lineHeight: 1.7, color: P.text, opacity: 0.85 }}>
          <p style={{ marginBottom: 16 }}>
            A token is the fundamental unit that AI language models use to process text. When you send
            a prompt to ChatGPT, Claude, Gemini, or any other large language model, your text is first
            broken down into tokens before the model can understand and respond to it. Understanding
            token counts is essential for managing API costs and staying within context window limits.
          </p>
          <p style={{ marginBottom: 16 }}>
            Token counts directly determine how much you pay when using AI APIs. Every major provider
            — OpenAI, Anthropic, Google, and Meta — charges based on the number of tokens processed.
            Input tokens (your prompt) and output tokens (the model&apos;s response) are typically
            priced differently, with output tokens costing more. For example, Claude Sonnet 4 charges
            $3.00 USD per million input tokens but $15.00 USD per million output tokens.
          </p>
          <p style={{ marginBottom: 16 }}>
            Context windows are another critical consideration. Each model has a maximum number of
            tokens it can process in a single conversation. GPT-4o supports 128,000 tokens, Claude
            models support 200,000 tokens, and Gemini 1.5 Pro leads with 2 million tokens. If your
            text exceeds the context window, you will need to split it or use a model with a larger
            window.
          </p>
          <p style={{ marginBottom: 16 }}>
            Different tokenizers produce different counts for the same text. English text typically
            averages 1 token per 4 characters with GPT models and 1 token per 3.5 characters with
            Claude. Non-English text, code, and special characters often produce higher token counts.
            This is why comparing across models matters — the cheapest model per token is not always
            the cheapest for your specific text.
          </p>
          <p style={{ marginBottom: 16 }}>
            For Australian developers and businesses using AI APIs, costs are typically billed in USD.
            At the current exchange rate of approximately 1 USD = 1.55 AUD, it pays to compare
            carefully. Our{' '}
            <a href="/tools/chatgpt-cost-calculator" style={{ color: P.accent, textDecoration: 'underline' }}>
              ChatGPT Cost Calculator
            </a>{' '}
            and{' '}
            <a href="/tools/llm-model-price-comparison" style={{ color: P.accent, textDecoration: 'underline' }}>
              LLM Model Price Comparison
            </a>{' '}
            tools can help you find the best value for your use case.
          </p>
          <p>
            Use this free AI token counter to paste any text and instantly see how many tokens it uses
            across every major model. No signup required, no API key needed — just paste and count.
          </p>
        </div>
      </article>

      {/* Affiliate box — Claude Pro */}
      <div
        style={{
          marginTop: 48,
          backgroundColor: P.surface,
          border: `1px solid ${P.border}`,
          borderRadius: 12,
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <img
          src="https://logo.clearbit.com/claude.ai"
          alt="Claude logo"
          width={40}
          height={40}
          style={{ borderRadius: 8, flexShrink: 0 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: P.text, fontFamily: "'Space Grotesk', sans-serif" }}>
            Claude Pro
          </div>
          <div style={{ fontSize: 14, color: P.muted, lineHeight: 1.4 }}>
            Advanced AI assistant for professionals — extended context, priority access, and higher usage limits.
          </div>
        </div>
        <a
          href="https://claude.ai/pro"
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 700,
            color: '#FFFFFF',
            backgroundColor: P.accent,
            border: 'none',
            borderRadius: 8,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Try Claude Pro
        </a>
        <div style={{ width: '100%', fontSize: 11, color: P.muted, marginTop: -8 }}>
          Sponsored
        </div>
      </div>

      {/* Related Tools */}
      <RelatedTools currentSlug="ai-token-counter" category="ai" />
    </ToolLayout>
  )
}

// --- Copy button ---
function CopyButton({ result }: { result: TokenCounterResult }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const lines = result.modelResults.map(
      (r) =>
        `${r.model.name}: ${formatTokenCount(r.tokenCount)} tokens — ${formatCostAUD(r.inputCostUSD)} input`
    )
    const text = `AI Token Count (${result.charCount} chars, ${result.wordCount} words)\n\n${lines.join('\n')}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: '8px 16px',
        fontSize: 14,
        fontWeight: 600,
        color: P.accent,
        backgroundColor: 'transparent',
        border: `1px solid ${P.accent}40`,
        borderRadius: 8,
        cursor: 'pointer',
        ...MONO,
      }}
    >
      {copied ? '✓ Copied' : 'Copy Results'}
    </button>
  )
}

// --- Share button ---
function ShareButton({ url }: { url: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      navigator.share({ title: 'AI Token Counter', url }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url).catch(() => {})
    }
  }

  return (
    <button
      onClick={handleShare}
      style={{
        padding: '8px 16px',
        fontSize: 14,
        fontWeight: 600,
        color: P.accent,
        backgroundColor: 'transparent',
        border: `1px solid ${P.accent}40`,
        borderRadius: 8,
        cursor: 'pointer',
        ...MONO,
      }}
    >
      Share
    </button>
  )
}

import { z } from 'zod'

// --- Input validation ---

export const tokenCounterInputSchema = z.object({
  text: z.string().min(1, 'Enter some text to count tokens'),
})

export type TokenCounterInput = z.infer<typeof tokenCounterInputSchema>

// --- Model definitions ---

export interface LLMModel {
  id: string
  name: string
  provider: string
  tokensPerChar: number // average tokens per character for this model's tokenizer
  inputPricePerMillion: number // USD per 1M input tokens
  outputPricePerMillion: number // USD per 1M output tokens
  contextWindow: number // max tokens
}

// Tokenizer ratios based on published benchmarks:
// - GPT-4/3.5 (cl100k_base): ~1 token per 4 characters for English
// - Claude (claude tokenizer): ~1 token per 3.5 characters for English
// - Gemini: ~1 token per 4 characters for English
// - Llama (SentencePiece): ~1 token per 3.8 characters for English

export const LLM_MODELS: LLMModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    tokensPerChar: 0.25,
    inputPricePerMillion: 2.50,
    outputPricePerMillion: 10.00,
    contextWindow: 128000,
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    tokensPerChar: 0.25,
    inputPricePerMillion: 10.00,
    outputPricePerMillion: 30.00,
    contextWindow: 128000,
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    tokensPerChar: 0.25,
    inputPricePerMillion: 0.50,
    outputPricePerMillion: 1.50,
    contextWindow: 16385,
  },
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    tokensPerChar: 0.286,
    inputPricePerMillion: 15.00,
    outputPricePerMillion: 75.00,
    contextWindow: 200000,
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    tokensPerChar: 0.286,
    inputPricePerMillion: 3.00,
    outputPricePerMillion: 15.00,
    contextWindow: 200000,
  },
  {
    id: 'claude-haiku-3.5',
    name: 'Claude Haiku 3.5',
    provider: 'Anthropic',
    tokensPerChar: 0.286,
    inputPricePerMillion: 0.80,
    outputPricePerMillion: 4.00,
    contextWindow: 200000,
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    tokensPerChar: 0.25,
    inputPricePerMillion: 0.10,
    outputPricePerMillion: 0.40,
    contextWindow: 1000000,
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    tokensPerChar: 0.25,
    inputPricePerMillion: 1.25,
    outputPricePerMillion: 5.00,
    contextWindow: 2000000,
  },
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    tokensPerChar: 0.263,
    inputPricePerMillion: 0.59,
    outputPricePerMillion: 0.79,
    contextWindow: 128000,
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B',
    provider: 'Meta',
    tokensPerChar: 0.263,
    inputPricePerMillion: 0.05,
    outputPricePerMillion: 0.08,
    contextWindow: 128000,
  },
]

// --- Result types ---

export interface ModelTokenResult {
  model: LLMModel
  tokenCount: number
  inputCostUSD: number
  outputCostUSD: number
  percentOfContext: number
}

export interface TokenCounterResult {
  text: string
  charCount: number
  wordCount: number
  lineCount: number
  modelResults: ModelTokenResult[]
}

// --- USD to AUD conversion (approximate, updated periodically) ---
const USD_TO_AUD = 1.55

export function usdToAud(usd: number): number {
  return usd * USD_TO_AUD
}

// --- Core calculation ---

export function countTokens(input: TokenCounterInput): TokenCounterResult | null {
  const parsed = tokenCounterInputSchema.safeParse(input)
  if (!parsed.success) return null

  const text = parsed.data.text
  const charCount = text.length
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const lineCount = text.split('\n').length

  const modelResults: ModelTokenResult[] = LLM_MODELS.map((model) => {
    const tokenCount = Math.max(1, Math.round(charCount * model.tokensPerChar))
    const inputCostUSD = (tokenCount / 1_000_000) * model.inputPricePerMillion
    const outputCostUSD = (tokenCount / 1_000_000) * model.outputPricePerMillion
    const percentOfContext = (tokenCount / model.contextWindow) * 100

    return {
      model,
      tokenCount,
      inputCostUSD,
      outputCostUSD,
      percentOfContext,
    }
  })

  return {
    text,
    charCount,
    wordCount,
    lineCount,
    modelResults,
  }
}

// --- Formatting helpers ---

export function formatCostAUD(usd: number): string {
  const aud = usdToAud(usd)
  if (aud < 0.01) return '<$0.01 AUD'
  return `$${aud.toFixed(4)} AUD`
}

export function formatTokenCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toLocaleString('en-AU')
}

export function formatContextPercent(percent: number): string {
  if (percent < 0.01) return '<0.01%'
  if (percent < 1) return `${percent.toFixed(2)}%`
  return `${percent.toFixed(1)}%`
}

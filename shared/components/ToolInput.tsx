'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface ToolInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label: string
  error?: string
  accentColor: string
  primaryColor: string
  helpText?: string
}

const ToolInput = forwardRef<HTMLInputElement, ToolInputProps>(
  ({ label, error, accentColor, primaryColor, helpText, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${inputId}-error`

    return (
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            fontSize: 14,
            fontWeight: 600,
            color: primaryColor,
            marginBottom: 6,
          }}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            minHeight: 48,
            borderRadius: 12,
            border: error ? '2px solid #DC2626' : '1px solid #E2E8F0',
            outline: 'none',
            transition: 'border-color 150ms ease, transform 150ms ease',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = accentColor
            e.currentTarget.style.borderWidth = '2px'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = '#E2E8F0'
              e.currentTarget.style.borderWidth = '1px'
            }
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            role="alert"
            style={{
              color: '#DC2626',
              fontSize: 14,
              marginTop: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>⚠</span> {error}
          </p>
        )}
        {helpText && !error && (
          <p style={{ fontSize: 12, marginTop: 4, opacity: 0.6 }}>{helpText}</p>
        )}
      </div>
    )
  }
)

ToolInput.displayName = 'ToolInput'

export default ToolInput

import { useState, useMemo, useCallback } from 'react'
import { fixParser } from '@/lib/fix-parser'

export function useFixParser() {
  const [input, setInput] = useState('')

  const messages = useMemo(() => {
    if (!input.trim()) return []

    const parsed = fixParser.parse(input)
    const compIds: Record<string, boolean> = {}

    // Track sender/targets for side detection
    parsed.forEach((msg) => {
      if (msg.senderCompId) compIds[msg.senderCompId] = true
      if (msg.targetCompId) compIds[msg.targetCompId] = true
    })

    // Set left/right sides if exactly two parties
    if (Object.keys(compIds).length === 2) {
      const leftCompId = parsed[0]?.senderCompId
      parsed.forEach((msg) => {
        msg.side = msg.senderCompId === leftCompId ? 'left' : 'right'
      })
    }

    return parsed
  }, [input])

  const clear = useCallback(() => setInput(''), [])

  return {
    input,
    setInput,
    messages,
    clear,
    hasMessages: messages.length > 0,
  }
}

export type UseFixParserReturn = ReturnType<typeof useFixParser>

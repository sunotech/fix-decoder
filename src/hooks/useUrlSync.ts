import { useEffect, useRef } from 'react'
import { getHashFromUrl, setHashToUrl } from '@/lib/url-encoder'

export function useUrlSync(
  value: string,
  onChange: (value: string) => void
) {
  const isInitialMount = useRef(true)

  // Decode hash on mount
  useEffect(() => {
    const decoded = getHashFromUrl()
    if (decoded) {
      onChange(decoded)
    }
    isInitialMount.current = false
  }, []) // Only run on mount

  // Update hash when value changes (but not on initial mount)
  useEffect(() => {
    if (!isInitialMount.current) {
      setHashToUrl(value)
    }
  }, [value])

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const decoded = getHashFromUrl()
      onChange(decoded)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [onChange])
}

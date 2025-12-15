import { useMemo, useCallback } from 'react'
import { useSearch } from '@/context/SearchContext'
import type { ParsedField } from '@/types/fix'

export function useFieldSearch() {
  const { searchQuery } = useSearch()

  const normalizedQuery = useMemo(
    () => searchQuery.toLowerCase().trim(),
    [searchQuery]
  )

  const isFieldMatch = useCallback(
    (field: ParsedField): boolean => {
      if (!normalizedQuery) return true

      const searchableValues = [
        String(field.fieldId),
        field.field?.name || '',
        field.value,
        field.decodedValue || '',
        field.field?.type || '',
      ]

      return searchableValues.some((val) =>
        val.toLowerCase().includes(normalizedQuery)
      )
    },
    [normalizedQuery]
  )

  const hasActiveSearch = normalizedQuery.length > 0

  return {
    searchQuery: normalizedQuery,
    isFieldMatch,
    hasActiveSearch,
  }
}

export function highlightMatch(text: string | number, query: string): React.ReactNode {
  const textStr = String(text)
  if (!query || !textStr) return textStr

  const lowerText = textStr.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) return textStr

  const before = textStr.slice(0, index)
  const match = textStr.slice(index, index + query.length)
  const after = textStr.slice(index + query.length)

  return (
    <>
      {before}
      <mark className="bg-yellow-300 dark:bg-yellow-600 px-0.5 rounded">
        {match}
      </mark>
      {after}
    </>
  )
}

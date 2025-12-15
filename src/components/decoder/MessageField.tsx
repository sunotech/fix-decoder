import { cn } from '@/lib/utils'
import { highlightMatch } from '@/hooks/useFieldSearch'
import type { ParsedField } from '@/types/fix'

interface MessageFieldProps {
  field: ParsedField
  showDataType: boolean
  isEven: boolean
  searchQuery?: string
}

export function MessageField({ field, showDataType, isEven, searchQuery = '' }: MessageFieldProps) {
  const isSystemField = field.classes.includes('system-field')
  const isHeaderField = field.classes.includes('header-field')
  const isDeprecatedField = field.classes.includes('deprecated-field')
  const isValid = field.classes.includes('valid')
  const isInvalid = field.classes.includes('invalid')

  // Build external link to FIX dictionary
  const dictionaryUrl = `https://www.onixs.biz/fix-dictionary/4.4/tagNum_${field.fieldId}.html`

  return (
    <tr
      className={cn(
        'border-b border-border/50 last:border-0',
        isEven && 'bg-muted/30',
        isSystemField && 'text-muted-foreground',
        isHeaderField && 'text-muted-foreground',
        isDeprecatedField && 'text-orange-500 dark:text-orange-400',
        isValid && 'bg-green-100 dark:bg-green-950/30',
        isInvalid && 'bg-red-100 dark:bg-red-950/30'
      )}
    >
      <td className="py-1 pr-4 font-mono text-xs w-14">
        <a
          href={dictionaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {highlightMatch(field.fieldId, searchQuery)}
        </a>
      </td>
      <td className="py-1 pr-4 text-xs w-44">
        {field.field?.name ? (
          highlightMatch(field.field.name, searchQuery)
        ) : (
          <span className="italic text-muted-foreground">Unknown</span>
        )}
      </td>
      {showDataType && (
        <td className="py-1 pr-4 font-mono text-xs text-muted-foreground w-28">
          {field.field?.type ? highlightMatch(field.field.type, searchQuery) : '-'}
        </td>
      )}
      <td className="py-1 text-xs">
        <span className="font-mono">{highlightMatch(field.value, searchQuery)}</span>
        {field.decodedValue && (
          <span
            className={cn(
              'ml-1 text-muted-foreground',
              isValid && 'text-green-600 dark:text-green-400',
              isInvalid && 'text-red-600 dark:text-red-400'
            )}
          >
            ({highlightMatch(field.decodedValue, searchQuery)})
          </span>
        )}
      </td>
    </tr>
  )
}

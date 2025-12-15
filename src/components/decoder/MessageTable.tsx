import { MessageField } from './MessageField'
import { useFieldSearch } from '@/hooks/useFieldSearch'
import type { ParsedField } from '@/types/fix'

interface MessageTableProps {
  fields: ParsedField[]
  showDataType: boolean
}

export function MessageTable({ fields, showDataType }: MessageTableProps) {
  const { searchQuery, isFieldMatch, hasActiveSearch } = useFieldSearch()

  const filteredFields = hasActiveSearch
    ? fields.filter(isFieldMatch)
    : fields

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-1 pr-4 font-medium text-muted-foreground w-14">
              Tag
            </th>
            <th className="pb-1 pr-4 font-medium text-muted-foreground w-44">
              Name
            </th>
            {showDataType && (
              <th className="pb-1 pr-4 font-medium text-muted-foreground w-28">
                Type
              </th>
            )}
            <th className="pb-1 font-medium text-muted-foreground">Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredFields.length > 0 ? (
            filteredFields.map((field, index) => (
              <MessageField
                key={`${field.fieldId}-${index}`}
                field={field}
                showDataType={showDataType}
                isEven={index % 2 === 1}
                searchQuery={searchQuery}
              />
            ))
          ) : (
            <tr>
              <td colSpan={showDataType ? 4 : 3} className="py-2 text-center text-muted-foreground">
                No matching fields
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

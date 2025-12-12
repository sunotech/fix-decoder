import { MessageField } from './MessageField'
import type { ParsedField } from '@/types/fix'

interface MessageTableProps {
  fields: ParsedField[]
  showDataType: boolean
}

export function MessageTable({ fields, showDataType }: MessageTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-1 pr-3 font-medium text-muted-foreground">
              Tag
            </th>
            <th className="pb-1 pr-3 font-medium text-muted-foreground">
              Name
            </th>
            {showDataType && (
              <th className="pb-1 pr-3 font-medium text-muted-foreground">
                Type
              </th>
            )}
            <th className="pb-1 font-medium text-muted-foreground">Value</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <MessageField
              key={`${field.fieldId}-${index}`}
              field={field}
              showDataType={showDataType}
              isEven={index % 2 === 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

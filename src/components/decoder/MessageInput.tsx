import { X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
  hasContent: boolean
}

export function MessageInput({
  value,
  onChange,
  onClear,
  hasContent,
}: MessageInputProps) {
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your FIX message here..."
        className={cn(
          'min-h-[100px] resize-y font-mono text-xs',
          'placeholder:text-muted-foreground/60'
        )}
      />
      {hasContent && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear input</span>
        </Button>
      )}
    </div>
  )
}

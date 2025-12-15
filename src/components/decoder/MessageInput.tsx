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
        spellCheck={false}
        className={cn(
          'min-h-[200px] resize-y',
          'font-mono text-[12px] leading-relaxed',
          'bg-white/95 text-zinc-800 border-orange-300',
          'placeholder:text-zinc-400',
          'focus-visible:ring-orange-400'
        )}
      />
      {hasContent && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="absolute right-2 top-2 h-6 w-6 text-zinc-400 hover:text-zinc-600 hover:bg-orange-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear input</span>
        </Button>
      )}
    </div>
  )
}

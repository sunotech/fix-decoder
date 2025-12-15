import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageTable } from './MessageTable'
import type { FixMessage } from '@/types/fix'

interface MessageCardProps {
  message: FixMessage
  index: number
  showDataType: boolean
}

export function MessageCard({ message, index, showDataType }: MessageCardProps) {
  const isLeft = message.side === 'left'
  const isRight = message.side === 'right'

  return (
    <div
      className={cn(
        'flex',
        isLeft && 'justify-start',
        isRight && 'justify-end',
        !isLeft && !isRight && 'justify-start'
      )}
    >
      <Card
        className={cn(
          'transition-all w-[85%]',
          isLeft && 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20',
          isRight && 'border-r-4 border-r-green-500 bg-green-50/50 dark:bg-green-950/20'
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-base">
              {message.typeName || `Message ${index + 1}`}
            </CardTitle>
            {message.fixVersion && (
              <Badge variant="secondary" className="text-xs">FIX.{message.fixVersion}</Badge>
            )}
            {message.type && (
              <Badge variant="outline" className="font-mono text-xs">
                {message.type}
              </Badge>
            )}
            {message.checksumValid === true && (
              <Badge variant="success" className="text-xs">Valid</Badge>
            )}
            {message.checksumValid === false && (
              <Badge variant="destructive" className="text-xs">Invalid</Badge>
            )}
          </div>
          {(message.senderCompId || message.targetCompId) && (
            <p className="text-xs text-muted-foreground">
              {message.senderCompId && (
                <span className={cn(isLeft && 'font-semibold text-blue-600 dark:text-blue-400')}>
                  {message.senderCompId}
                </span>
              )}
              {message.senderCompId && message.targetCompId && ' → '}
              {message.targetCompId && (
                <span className={cn(isRight && 'font-semibold text-green-600 dark:text-green-400')}>
                  {message.targetCompId}
                </span>
              )}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <MessageTable fields={message.fields} showDataType={showDataType} />
        </CardContent>
      </Card>
    </div>
  )
}

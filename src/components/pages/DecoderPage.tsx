import { useState, useCallback } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { MessageInput } from '@/components/decoder/MessageInput'
import { MessageCard } from '@/components/decoder/MessageCard'
import { SampleMessages } from '@/components/decoder/SampleMessages'
import { DecoderOptions } from '@/components/decoder/DecoderOptions'
import { CustomTagsPanel } from '@/components/decoder/CustomTagsPanel'
import { KeyFeatures } from '@/components/decoder/KeyFeatures'
import { DelimiterTable } from '@/components/decoder/DelimiterTable'
import { useFixParser } from '@/hooks/useFixParser'
import { useUrlSync } from '@/hooks/useUrlSync'
import { cn } from '@/lib/utils'
import { SEO } from '@/components/common/SEO'

export function DecoderPage() {
  const { input, setInput, messages, clear, hasMessages } = useFixParser()
  const [showDataType, setShowDataType] = useState(false)
  const [hideRawMessage, setHideRawMessage] = useState(false)

  // Sync with URL
  useUrlSync(input, setInput)

  const handleSampleSelect = useCallback(
    (message: string) => {
      setInput(message)
    },
    [setInput]
  )

  return (
    <div className="space-y-4">
      <SEO
        title="Decoder"
        description="Decode specific FIX messages instantly. Paste your FIX message to visualize the data flow, inspect tags, and validate fields."
        keywords={['fix decoder', 'fix protocol', 'financial information exchange', 'fix message parser']}
      />
      {/* Header with Options */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold">FIX Message Decoder</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="hide-raw"
              checked={hideRawMessage}
              onCheckedChange={setHideRawMessage}
            />
            <label
              htmlFor="hide-raw"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Hide raw
            </label>
          </div>
          <DecoderOptions
            showDataType={showDataType}
            onShowDataTypeChange={setShowDataType}
          />
        </div>
      </div>

      {/* Pinned Raw Input - only sticky when expanded */}
      <div className={cn(hideRawMessage ? '' : 'sticky top-16 z-20')}>
        <Card className="bg-gradient-to-br from-orange-400 to-orange-500 border-4 border-orange-600 shadow-lg">
          <CardHeader
            className={cn(
              'pb-2 cursor-pointer select-none',
              hideRawMessage && 'pb-3'
            )}
            onClick={() => setHideRawMessage(!hideRawMessage)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-white font-semibold">Raw FIX Message</CardTitle>
              {hideRawMessage ? (
                <ChevronDown className="h-4 w-4 text-orange-200" />
              ) : (
                <ChevronUp className="h-4 w-4 text-orange-200" />
              )}
            </div>
          </CardHeader>
          {!hideRawMessage && (
            <CardContent className="space-y-3">
              <MessageInput
                value={input}
                onChange={setInput}
                onClear={clear}
                hasContent={input.length > 0}
              />
              {!hasMessages && <SampleMessages onSelect={handleSampleSelect} />}
            </CardContent>
          )}
        </Card>
      </div>

      {/* Custom Tags Panel */}
      <CustomTagsPanel />

      {/* Decoded Messages */}
      {hasMessages ? (
        <div className="space-y-2 max-w-[900px]">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Decoded Messages ({messages.length})
          </h2>
          {messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              index={index}
              showDataType={showDataType}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="py-6 text-center">
            <p className="text-xs text-muted-foreground">
              {input ? 'No valid FIX messages found' : 'Paste a FIX message to decode'}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <DelimiterTable />
            <KeyFeatures />
          </div>
        </div>
      )}
    </div>
  )
}

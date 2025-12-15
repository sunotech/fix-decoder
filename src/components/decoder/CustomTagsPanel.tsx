import { useState } from 'react'
import { ChevronDown, ChevronUp, AlertTriangle, Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useCustomTags, SAMPLE_CUSTOM_TAGS_JSON } from '@/context/CustomTagsContext'

export function CustomTagsPanel() {
  const {
    customTagsJson,
    setCustomTagsJson,
    allProviders,
    enabledProviders,
    toggleProvider,
    enableAllProviders,
    disableAllProviders,
    hasCustomTags,
  } = useCustomTags()

  const [isExpanded, setIsExpanded] = useState(false)
  const [localJson, setLocalJson] = useState(customTagsJson)
  const [error, setError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  const handleJsonChange = (value: string) => {
    setLocalJson(value)
    setIsDirty(value !== customTagsJson)
    setError(null)
  }

  const handleApply = () => {
    const result = setCustomTagsJson(localJson)
    if (result.success) {
      setError(null)
      setIsDirty(false)
    } else {
      setError(result.error || 'Invalid JSON')
    }
  }

  const handleClear = () => {
    setLocalJson('')
    setCustomTagsJson('')
    setError(null)
    setIsDirty(false)
  }

  const handleLoadSample = () => {
    setLocalJson(SAMPLE_CUSTOM_TAGS_JSON)
    setIsDirty(true)
    setError(null)
  }

  // Sync local state when context changes (e.g., from file load)
  if (!isDirty && localJson !== customTagsJson) {
    setLocalJson(customTagsJson)
  }

  return (
    <Card className="border-dashed border-2 border-muted-foreground/30">
      <CardHeader
        className={cn(
          'pb-2 cursor-pointer select-none',
          !isExpanded && 'pb-3'
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium">Custom FIX Tags</CardTitle>
            {hasCustomTags && (
              <Badge variant="secondary" className="text-xs">
                {allProviders.length} provider{allProviders.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Warning Banner */}
          <div className="flex items-start gap-2 p-3 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800 dark:text-amber-200">
              Custom tags are stored in browser memory only. They will be lost on page refresh.
              For persistent storage, self-host and place your definitions in{' '}
              <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">public/custom_fix_tags.json</code>
            </p>
          </div>

          {/* Provider Toggles */}
          {hasCustomTags && allProviders.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Active Providers</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs px-2"
                    onClick={(e) => { e.stopPropagation(); enableAllProviders(); }}
                  >
                    All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs px-2"
                    onClick={(e) => { e.stopPropagation(); disableAllProviders(); }}
                  >
                    None
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {allProviders.map((provider) => (
                  <Badge
                    key={provider}
                    variant={enabledProviders.has(provider) ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={(e) => { e.stopPropagation(); toggleProvider(provider); }}
                  >
                    {enabledProviders.has(provider) ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <X className="h-3 w-3 mr-1" />
                    )}
                    {provider}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* JSON Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">
                Custom Tags JSON
              </label>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={(e) => { e.stopPropagation(); handleLoadSample(); }}
              >
                Load sample
              </Button>
            </div>
            <Textarea
              value={localJson}
              onChange={(e) => handleJsonChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder={`Paste your custom FIX tags JSON here...\n\nExample format:\n${SAMPLE_CUSTOM_TAGS_JSON}`}
              className={cn(
                'min-h-[150px] font-mono text-xs',
                error && 'border-red-500 focus-visible:ring-red-500'
              )}
            />
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={(e) => { e.stopPropagation(); handleApply(); }}
              disabled={!isDirty && !error}
            >
              Apply
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
              disabled={!localJson && !hasCustomTags}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

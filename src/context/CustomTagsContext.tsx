import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { CustomTag, CustomTagsConfig, FieldDefinition } from '@/types/fix'

interface CustomTagsContextType {
  customTags: CustomTag[]
  enabledProviders: Set<string>
  allProviders: string[]
  setCustomTagsJson: (json: string) => { success: boolean; error?: string }
  customTagsJson: string
  toggleProvider: (provider: string) => void
  enableAllProviders: () => void
  disableAllProviders: () => void
  getCustomFieldDefinition: (tagId: number) => FieldDefinition | null
  hasCustomTags: boolean
  isLoaded: boolean
}

const CustomTagsContext = createContext<CustomTagsContextType | undefined>(undefined)

const SAMPLE_CONFIG: CustomTagsConfig = {
  customTags: [
    {
      provider: "Example_Provider",
      tag: 9999,
      name: "EXAMPLE_TAG",
      type: "STRING",
      values: {
        "1": "Option A",
        "2": "Option B"
      }
    }
  ]
}

export function CustomTagsProvider({ children }: { children: ReactNode }) {
  const [customTags, setCustomTags] = useState<CustomTag[]>([])
  const [customTagsJson, setCustomTagsJsonState] = useState('')
  const [enabledProviders, setEnabledProviders] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load custom tags from file for self-hosted mode
  useEffect(() => {
    const loadFromFile = async () => {
      try {
        const response = await fetch('/custom_fix_tags.json')
        if (response.ok) {
          const text = await response.text()
          const config: CustomTagsConfig = JSON.parse(text)
          if (config.customTags && Array.isArray(config.customTags)) {
            setCustomTags(config.customTags)
            setCustomTagsJsonState(text)
            // Enable all providers by default when loading from file
            const providers = new Set(config.customTags.map(t => t.provider))
            setEnabledProviders(providers)
          }
        }
      } catch {
        // File doesn't exist or invalid - this is fine for web mode
      } finally {
        setIsLoaded(true)
      }
    }
    loadFromFile()
  }, [])

  // Get all unique providers
  const allProviders = [...new Set(customTags.map(t => t.provider))].sort()

  // Parse and set custom tags from JSON string
  const setCustomTagsJson = useCallback((json: string): { success: boolean; error?: string } => {
    setCustomTagsJsonState(json)

    if (!json.trim()) {
      setCustomTags([])
      setEnabledProviders(new Set())
      return { success: true }
    }

    try {
      const config: CustomTagsConfig = JSON.parse(json)

      if (!config.customTags || !Array.isArray(config.customTags)) {
        return { success: false, error: 'Invalid format: expected { "customTags": [...] }' }
      }

      // Validate each tag
      for (const tag of config.customTags) {
        if (!tag.provider || typeof tag.provider !== 'string') {
          return { success: false, error: 'Each tag must have a "provider" string' }
        }
        if (!tag.tag || typeof tag.tag !== 'number') {
          return { success: false, error: 'Each tag must have a "tag" number' }
        }
        if (!tag.name || typeof tag.name !== 'string') {
          return { success: false, error: 'Each tag must have a "name" string' }
        }
        if (!tag.type || typeof tag.type !== 'string') {
          return { success: false, error: 'Each tag must have a "type" string' }
        }
      }

      setCustomTags(config.customTags)
      // Enable all new providers by default
      const providers = new Set(config.customTags.map(t => t.provider))
      setEnabledProviders(providers)
      return { success: true }
    } catch (e) {
      return { success: false, error: `Invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}` }
    }
  }, [])

  const toggleProvider = useCallback((provider: string) => {
    setEnabledProviders(prev => {
      const next = new Set(prev)
      if (next.has(provider)) {
        next.delete(provider)
      } else {
        next.add(provider)
      }
      return next
    })
  }, [])

  const enableAllProviders = useCallback(() => {
    setEnabledProviders(new Set(allProviders))
  }, [allProviders])

  const disableAllProviders = useCallback(() => {
    setEnabledProviders(new Set())
  }, [])

  // Get custom field definition for a tag ID
  // Returns definitions from all enabled providers (multiple providers can define same tag)
  const getCustomFieldDefinition = useCallback((tagId: number): FieldDefinition | null => {
    const matchingTags = customTags.filter(
      t => t.tag === tagId && enabledProviders.has(t.provider)
    )

    if (matchingTags.length === 0) return null

    // If multiple providers define the same tag, merge them
    if (matchingTags.length === 1) {
      const tag = matchingTags[0]
      return {
        name: tag.name,
        type: tag.type,
        values: tag.values,
        provider: tag.provider,
      }
    }

    // Multiple providers - show combined name with providers
    const names = matchingTags.map(t => `${t.name} [${t.provider}]`)
    const mergedValues: Record<string, string> = {}

    for (const tag of matchingTags) {
      if (tag.values) {
        for (const [k, v] of Object.entries(tag.values)) {
          // If same value exists, append provider info
          if (mergedValues[k] && mergedValues[k] !== v) {
            mergedValues[k] = `${mergedValues[k]} / ${v} [${tag.provider}]`
          } else {
            mergedValues[k] = v
          }
        }
      }
    }

    return {
      name: names.join(' / '),
      type: matchingTags[0].type,
      values: Object.keys(mergedValues).length > 0 ? mergedValues : undefined,
      provider: matchingTags.map(t => t.provider).join(', '),
    }
  }, [customTags, enabledProviders])

  const hasCustomTags = customTags.length > 0

  return (
    <CustomTagsContext.Provider
      value={{
        customTags,
        enabledProviders,
        allProviders,
        setCustomTagsJson,
        customTagsJson,
        toggleProvider,
        enableAllProviders,
        disableAllProviders,
        getCustomFieldDefinition,
        hasCustomTags,
        isLoaded,
      }}
    >
      {children}
    </CustomTagsContext.Provider>
  )
}

export function useCustomTags() {
  const context = useContext(CustomTagsContext)
  if (context === undefined) {
    throw new Error('useCustomTags must be used within a CustomTagsProvider')
  }
  return context
}

// Export sample config for UI placeholder
export const SAMPLE_CUSTOM_TAGS_JSON = JSON.stringify(SAMPLE_CONFIG, null, 2)

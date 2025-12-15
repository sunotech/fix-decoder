export interface FieldDefinition {
  name: string
  type: string
  values?: Record<string, string>
  isHeaderField?: boolean
  isRequired?: boolean
  deprecatedSince?: number
  allowOtherValues?: boolean
  provider?: string // For custom tags: which provider defined this
}

// Custom FIX tag definition (user-provided)
export interface CustomTag {
  provider: string
  tag: number
  name: string
  type: string
  values?: Record<string, string>
}

export interface CustomTagsConfig {
  customTags: CustomTag[]
}

export interface ParsedField {
  fieldId: number
  value: string
  field: FieldDefinition | null
  raw: string
  decodedValue: string | null
  classes: string[]
  isValid?: boolean
}

export interface FixMessage {
  fields: ParsedField[]
  type: string
  typeName: string
  fixVersion: string
  senderCompId: string
  targetCompId: string
  side?: 'left' | 'right'
  checksumValid?: boolean
  bodyLengthValid?: boolean
}

export interface DecoderOptions {
  showDataType: boolean
}

export interface FieldDefinition {
  name: string
  type: string
  values?: Record<string, string>
  isHeaderField?: boolean
  isRequired?: boolean
  deprecatedSince?: number
  allowOtherValues?: boolean
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

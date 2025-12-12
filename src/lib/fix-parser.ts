import { fieldById, systemFieldIds } from './fix-data'
import type { FixMessage, ParsedField } from '@/types/fix'

const FIELD_IDS = {
  CHECKSUM: 10,
  BEGIN_STRING: 8,
  BODY_LENGTH: 9,
  MSG_TYPE: 35,
  SENDER_COMP_ID: 49,
  TARGET_COMP_ID: 56,
} as const

export class FixParser {
  parse(str: string): FixMessage[] {
    // Create a sequence of fields
    const regex = /([0-9]+)=([^|;\u0001]*)/g
    const fields: ParsedField[] = []
    let result: RegExpExecArray | null

    let fixVersion = 0

    while ((result = regex.exec(str)) !== null) {
      const fieldId = parseInt(result[1])
      const value = result[2]
      const field = fieldById[String(fieldId)] || null
      const decodedValue = field?.values?.[value] || null

      if (fieldId === FIELD_IDS.BEGIN_STRING) {
        fixVersion = this.parseVersionFromBeginString(value)
      }

      const classes: string[] = []

      if (systemFieldIds.includes(fieldId)) {
        classes.push('system-field')
      }

      if (field) {
        if (field.isRequired) {
          classes.push('required-field')
        }
        if (field.deprecatedSince && field.deprecatedSince <= fixVersion) {
          classes.push('deprecated-field')
        }
        if (field.isHeaderField) {
          classes.push('header-field')
        }
      }

      fields.push({
        fieldId,
        value,
        field,
        raw: fieldId + '=' + value + '\u0001',
        decodedValue,
        classes,
      })
    }

    // Divide the sequence up into one or more messages
    let message: FixMessage | undefined
    const messages: FixMessage[] = []
    let hasActiveMessage = false

    const createMessage = (): void => {
      message = {
        fields: [],
        type: '',
        typeName: '',
        fixVersion: '',
        senderCompId: '',
        targetCompId: '',
      }
      messages.push(message)
      hasActiveMessage = true
    }

    for (const field of fields) {
      let processed = false

      switch (field.fieldId) {
        case FIELD_IDS.CHECKSUM:
          if (hasActiveMessage && message) {
            message.fields.push(field)
            hasActiveMessage = false
            message = undefined
            processed = true
          }
          break
        case FIELD_IDS.BEGIN_STRING:
          createMessage()
          if (message) {
            message.fixVersion = field.value.replace('FIX.', '')
          }
          break
        case FIELD_IDS.MSG_TYPE:
          if (!hasActiveMessage) {
            createMessage()
          }
          if (message) {
            message.type = field.value
            message.typeName = field.decodedValue || 'Unknown Message Type'
          }
          break
        case FIELD_IDS.SENDER_COMP_ID:
          if (message) {
            message.senderCompId = field.value
          }
          break
        case FIELD_IDS.TARGET_COMP_ID:
          if (message) {
            message.targetCompId = field.value
          }
          break
      }

      if (!processed) {
        if (!hasActiveMessage) {
          createMessage()
        }
        if (message) {
          message.fields.push(field)
        }
      }
    }

    // BodyLength(9) verification
    for (const msg of messages) {
      let bodyLengthField: ParsedField | undefined
      let length = 0

      for (const field of msg.fields) {
        if (field.fieldId === FIELD_IDS.BODY_LENGTH) {
          bodyLengthField = field
          continue
        }

        // Some fields are not part of the FIX message body, skip them
        if (
          field.fieldId === FIELD_IDS.BEGIN_STRING ||
          field.fieldId === FIELD_IDS.CHECKSUM
        ) {
          continue
        }

        length += field.raw.length
      }

      if (!bodyLengthField) {
        continue
      }

      if (parseInt(bodyLengthField.value) === length) {
        bodyLengthField.classes.push('valid')
        bodyLengthField.decodedValue = 'Valid'
        bodyLengthField.isValid = true
      } else {
        bodyLengthField.classes.push('invalid')
        bodyLengthField.decodedValue = `/!\\ Invalid (expected ${length})`
        bodyLengthField.isValid = false
      }
    }

    // Checksum(10) verification
    for (const msg of messages) {
      let checksumField: ParsedField | undefined
      let sum = 0

      for (const field of msg.fields) {
        if (field.fieldId === FIELD_IDS.CHECKSUM) {
          checksumField = field
          continue
        }

        for (let i = 0; i < field.raw.length; i++) {
          sum += field.raw.charCodeAt(i)
        }
      }

      // Modulo 256 + pad up to 3 characters with zero
      const expectedChecksum = String(sum % 256).padStart(3, '0')

      if (!checksumField) {
        continue
      }

      if (checksumField.value === expectedChecksum) {
        checksumField.classes.push('valid')
        checksumField.decodedValue = 'Valid'
        checksumField.isValid = true
        msg.checksumValid = true
      } else {
        checksumField.classes.push('invalid')
        checksumField.decodedValue = `/!\\ Invalid (expected ${expectedChecksum})`
        checksumField.isValid = false
        msg.checksumValid = false
      }
    }

    return messages
  }

  private parseVersionFromBeginString(beginStr: string): number {
    return parseFloat(beginStr.substring('FIX.'.length))
  }
}

// Singleton instance for convenience
export const fixParser = new FixParser()

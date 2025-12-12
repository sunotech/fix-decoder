const MAX_HASH_LENGTH = 10 * 1024 // 10KB max

export function encodeMessage(data: string): string {
  if (!data) return ''
  try {
    // Use TextEncoder for proper UTF-8 handling
    const encoder = new TextEncoder()
    const bytes = encoder.encode(data)
    const binary = Array.from(bytes)
      .map((byte) => String.fromCharCode(byte))
      .join('')
    return btoa(binary)
  } catch {
    return ''
  }
}

export function decodeMessage(data: string): string {
  if (!data) return ''
  try {
    const binary = atob(data)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    const decoder = new TextDecoder()
    return decoder.decode(bytes)
  } catch {
    return ''
  }
}

export function getHashFromUrl(): string {
  const hash = window.location.hash
  if (hash.startsWith('#base64:')) {
    return decodeMessage(hash.slice('#base64:'.length))
  }
  return ''
}

export function setHashToUrl(data: string): void {
  if (data) {
    const encoded = encodeMessage(data)
    const hash = `base64:${encoded}`
    if (hash.length < MAX_HASH_LENGTH) {
      window.location.hash = hash
    } else {
      window.location.hash = ''
    }
  } else {
    window.location.hash = ''
  }
}

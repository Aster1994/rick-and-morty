export function extractResourceId(url: string): number | null {
  const match = url.match(/\/(\d+)\/?$/)
  if (!match) return null

  const id = Number(match[1])
  return Number.isSafeInteger(id) && id > 0 ? id : null
}

export function normalizeToArray<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

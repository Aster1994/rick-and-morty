export function parsePage(value: unknown): number {
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) return 1

  const parsed = Number(value)
  return Number.isSafeInteger(parsed) ? parsed : 1
}

export function getVisiblePages(current: number, total: number): number[] {
  if (total <= 0) return []

  const start = Math.max(1, Math.min(current - 2, total - 4))
  const end = Math.min(total, start + 4)

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

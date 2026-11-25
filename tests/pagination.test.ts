import { describe, expect, it } from 'vitest'
import { getVisiblePages, parsePage } from '../app/utils/pagination'

describe('parsePage', () => {
  it('returns a valid positive integer', () => {
    expect(parsePage('12')).toBe(12)
  })

  it('falls back to page one for invalid values', () => {
    expect(parsePage(undefined)).toBe(1)
    expect(parsePage('0')).toBe(1)
    expect(parsePage('-3')).toBe(1)
    expect(parsePage('2.5')).toBe(1)
    expect(parsePage('abc')).toBe(1)
    expect(parsePage('9007199254740992')).toBe(1)
  })
})

describe('getVisiblePages', () => {
  it('returns all pages when there are five or fewer', () => {
    expect(getVisiblePages(2, 4)).toEqual([1, 2, 3, 4])
  })

  it('returns a five-page window around the current page', () => {
    expect(getVisiblePages(6, 10)).toEqual([4, 5, 6, 7, 8])
  })

  it('keeps the window within the final page', () => {
    expect(getVisiblePages(10, 10)).toEqual([6, 7, 8, 9, 10])
  })
})

import { describe, expect, it } from 'vitest'
import { extractResourceId, normalizeToArray } from '../app/utils/api'

describe('extractResourceId', () => {
  it('extracts a numeric resource id from an API URL', () => {
    expect(extractResourceId('https://rickandmortyapi.com/api/episode/28')).toBe(28)
  })

  it('returns null for invalid URLs or ids', () => {
    expect(extractResourceId('https://example.com/episode/nope')).toBeNull()
    expect(extractResourceId('https://example.com/episode/0')).toBeNull()
  })
})

describe('normalizeToArray', () => {
  it('normalizes an object to an array', () => {
    expect(normalizeToArray({ id: 1 })).toEqual([{ id: 1 }])
  })

  it('keeps arrays and normalizes nullish values', () => {
    expect(normalizeToArray([{ id: 1 }, { id: 2 }])).toHaveLength(2)
    expect(normalizeToArray(null)).toEqual([])
    expect(normalizeToArray(undefined)).toEqual([])
  })
})

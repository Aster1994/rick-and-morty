import type { ApiResource } from '~/types/api.ts'

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: ApiResource
  location: ApiResource
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface CharacterFilters {
  name: string
  status: '' | 'alive' | 'dead' | 'unknown'
  species: string
  gender: '' | 'female' | 'male' | 'genderless' | 'unknown'
}

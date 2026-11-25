export interface ApiInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface ApiResponse<T> {
  info: ApiInfo
  results: T[]
}

export interface ApiResource {
  id: number
  name: string
  url: string
}

export interface ApiError {
  statusCode: number
  statusMessage: string
  data: { error: string }
}

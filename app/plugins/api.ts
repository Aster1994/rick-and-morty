import type { ApiError } from '~/types/api'

export default defineNuxtPlugin(() => {
  const { apiBaseUrl } = useRuntimeConfig().public
  const { pushToast } = useToast()
  const api = $fetch.create({
    baseURL: apiBaseUrl,
    timeout: 10000,
    retry: 1,
    retryDelay: 500,
    retryStatusCodes: [408, 429, 500, 502, 503, 504],

    onRequestError({ error }) {
      const apiError: ApiError = {
        statusCode: 0,
        statusMessage: error.message,
        data: { error: 'Could not connect to the server. Please check your internet connection.' },
      }
      console.log('apiError', apiError)

      handleGlobalError(apiError)
    },

    onResponseError({ response }) {
      const apiError = normalizeHttpError(response.status, response._data)
      handleGlobalError(apiError)
    },
  })

  function normalizeHttpError(statusCode: number, data: unknown): ApiError {
    const serverMessage = (data as { message?: string } | undefined)?.message

    const fallbackMessages: Record<number, string> = {
      400: 'The request is invalid.',
      401: 'You need to log in again.',
      403: 'You do not have the necessary access for this operation.',
      404: 'The item you were looking for could not be found.',
      408: 'The request took too long.',
      409: 'This operation conflicts with the current state of the data.',
      422: 'The submitted data is invalid.',
      429: 'Too many requests. Please wait a moment.',
      500: 'A server error occurred. Please try again later.',
      502: 'The server is unavailable.',
      503: 'The service is temporarily unavailable.',
      504: 'The server response timed out.',
    }

    return {
      statusCode,
      statusMessage: serverMessage ?? `HTTP ${statusCode}`,
      data: {
        error: fallbackMessages[statusCode] ?? 'An unexpected error occurred. Please try again.',
      },
    }
  }

  function handleGlobalError(error: ApiError) {
    if (import.meta.dev) {
      console.error('[API ERROR]', error)
    }

    pushToast({ title: 'Error', text: error.data?.error, type: 'error' })

    if (error.statusCode === 401 && import.meta.client) {
      navigateTo('/auth/login')
    }
  }

  return {
    provide: {
      api,
      normalizeApiError: normalizeHttpError,
    },
  }
})

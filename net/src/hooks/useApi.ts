import { useState, useCallback } from 'react'

interface ApiResponse<T = unknown> {
  data: T | null
  error: string | null
  loading: boolean
  status?: number
  statusText?: string
  time?: number
}

export function useApi() {
  const [response, setResponse] = useState<ApiResponse>({
    data: null,
    error: null,
    loading: false,
  })

  const fetchApi = useCallback(async <T = unknown>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    setResponse({ data: null, error: null, loading: true })
    const startTime = performance.now()

    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const endTime = performance.now()
      const time = Math.round(endTime - startTime)

      const data = await res.json()

      const result: ApiResponse<T> = {
        data,
        error: res.ok ? null : data.error || 'Request failed',
        loading: false,
        status: res.status,
        statusText: res.statusText,
        time,
      }

      setResponse(result)
      return result
    } catch (err) {
      const endTime = performance.now()
      const time = Math.round(endTime - startTime)
      
      const result: ApiResponse<T> = {
        data: null,
        error: err instanceof Error ? err.message : 'Unknown error',
        loading: false,
        time,
      }
      
      setResponse(result)
      return result
    }
  }, [])

  const reset = useCallback(() => {
    setResponse({ data: null, error: null, loading: false })
  }, [])

  return { ...response, fetchApi, reset }
}

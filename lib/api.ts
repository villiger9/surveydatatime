// lib/api.ts
import type { PaginatedPolls } from '../types'

const BASE = 'https://poll-rs4it-test.rs-developing.com'

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'omit',
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  })
  const text = await res.text()
  const json = (text ? JSON.parse(text) : {}) as unknown
  if (!res.ok) {
    // throw a helpful message to the UI
    function asRecord(u: unknown): u is Record<string, unknown> {
      return typeof u === 'object' && u !== null
    }
    const maybeMessage = asRecord(json) ? (json.message ?? json.detail) : undefined
    throw new Error((maybeMessage as string) || `API error ${res.status}`)
  }
  return json as T
}

/** Auth: POST /auth/login */
export async function postLogin(payload: { username: string; password: string }) {
  return request<{ access_token: string; token_type?: string }>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

/** GET /admin/poll/ - fetch paginated polls */
export async function fetchPolls(page = 1, pagesize = 10, token?: string) {
  const qs = `?page=${page}&pagesize=${pagesize}&joinOperator=and`
  return request<PaginatedPolls>(`/admin/poll/${qs}`, {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })
}

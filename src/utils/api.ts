type ConfigFetch = {
  method: 'GET' | 'POST'
  body?: BodyInit
  contentType?: string
}

export function Api(
  url: string,
  { method, body, contentType }: ConfigFetch,
): Promise<Response> {
  const headers = new Headers()

  headers.append('Accept', 'application/json')
  headers.append('Origin', 'http://localhost:8000')

  const token = window.localStorage.getItem('access-token')

  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }

  if (contentType) {
    headers.append('Content-Type', contentType)
  }

  return fetch(DOMAIN_URL + url, {
    mode: 'cors',
    credentials: 'include',
    headers,
    method,
    body,
  })
}

export const DOMAIN_URL = 'http://localhost:8000'

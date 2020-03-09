interface HttpResponse<T> extends Response {
  parsedBody?: T
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request)
  try {
    response.parsedBody = await response.json()
  } catch (ex) {
    throw new Error('Failed to parse response')
  }

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response
}

export async function get<T>(
  path: string,
  args: RequestInit = {
    method: 'get',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args))
}

export async function post<R, T>(
  path: string,
  body: R,
  args: RequestInit = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args))
}

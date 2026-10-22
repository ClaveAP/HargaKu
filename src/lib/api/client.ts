const IS_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK === 'true' ||
  typeof process.env.NEXT_PUBLIC_USE_MOCK === 'undefined';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export { IS_MOCK };

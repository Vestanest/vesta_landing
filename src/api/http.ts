import { API_BASE_URL, authHeader } from "./config";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface HttpRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: TBody;
  auth?: boolean;
}

function buildUrl(path: string, query?: HttpRequestOptions["query"]): string {
  const url = new URL(path.startsWith("http") ? path : `${API_BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

export async function httpRequest<TResponse, TBody = unknown>(
  path: string,
  options: HttpRequestOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", headers = {}, query, body, auth } = options;
  const url = buildUrl(path, query);

  const init: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(auth ? authHeader() : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "omit",
    cache: "no-store",
  };

  const res = await fetch(url, init);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : (await res.text());

  if (!res.ok) {
    const message =
      typeof data === "string" ? data : data?.message || "Request failed";
    const error = new Error(message);
    // @ts-expect-error attach
    error.status = res.status;
    // @ts-expect-error attach
    error.data = data;
    throw error;
  }

  return data as TResponse;
}



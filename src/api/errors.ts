export interface ApiErrorShape {
  message: string;
  status?: number;
  data?: unknown;
}

export function toApiError(err: unknown): ApiErrorShape {
  if (err instanceof Error) {
    // @ts-expect-error custom fields may exist
    const status = err.status as number | undefined;
    // @ts-expect-error custom fields may exist
    const data = err.data as unknown;
    return { message: err.message || "Something went wrong", status, data };
  }
  return { message: "Something went wrong" };
}



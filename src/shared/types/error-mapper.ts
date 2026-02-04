import type { AppError } from "./errors";

export function mapAxiosError(
  data: any,
  status?: number
): AppError {
  // Validation (ASP.NET ProblemDetails)
  if (status === 400 && data?.errors) {
    return {
      kind: "validation",
      status: 400,
      errors: data.errors,
    };
  }

  // Domain / business error
  if (data[0]?.code && data[0]?.message) {
    return {
      kind: "business",
      status: status ?? 400,
      code: data[0].code,
      message: data[0].message,
      invalidField: data[0].invalidField,
    };
  }

  // Fallback
  return {
    kind: "unknown",
    status,
    message: "Unexpected error occurred",
  };
}
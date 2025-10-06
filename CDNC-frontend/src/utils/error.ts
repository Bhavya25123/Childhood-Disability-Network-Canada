import axios from "axios";

export function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError(error)) {
    const apiMessage =
      (typeof error.response?.data === "string" && error.response.data) ||
      (typeof error.response?.data?.error === "string" && error.response.data.error);
    if (apiMessage) {
      return apiMessage;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export function logError(context: string, error: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[${context}]`, error);
  }
}

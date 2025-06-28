import { toast } from "react-hot-toast";

export function handleUnexpectedError(error: unknown, fallbackMessage = "An unexpected error occurred.") {
  if (error instanceof Error) {
    toast.error(error.message);
    console.error("[Unexpected Error]", error);
  } else {
    toast.error(fallbackMessage);
    console.error("[Non-Error Exception]", error);
  }
}

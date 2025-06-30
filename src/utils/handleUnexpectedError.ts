import { toast } from "react-hot-toast";
import { errorMessages } from "../constants/errorMessages";

export function handleUnexpectedError(error: unknown, fallbackMessage = errorMessages.fallbackMessage) {
  if (error instanceof Error) {
    toast.error(error.message);
    console.error("[Unexpected Error]", error);
  } else {
    toast.error(fallbackMessage);
    console.error("[Non-Error Exception]", error);
  }
}

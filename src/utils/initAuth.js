import { restoreSession } from "../api/auth.api";

// Returns the user object if session is valid, null if not
export const initAuth = async () => {
  return await restoreSession();
};

import { restoreSession } from "../api/auth";

// Returns the user object if session is valid, null if not
export const initAuth = async () => {
  return await restoreSession();
};

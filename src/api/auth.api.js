import apiClient, { setAccessToken, clearAccessToken } from "./client";

// ── Register ──────────────────────────────────────────────────────────────────
// POST /auth/register
// returns: { statusCode: 201, data: { id, email, username, storageUsed }, message }
export const register = async ({ username, email, password }) => {
  const { data } = await apiClient.post("/auth/register", {
    username,
    email,
    password,
  });
  return data; // full ApiResponse
};

// ── Verify Email OTP ──────────────────────────────────────────────────────────
// POST /auth/verify-email
// returns: { statusCode: 200, data: {}, message: "Email verified successfully" }
export const verifyEmail = async ({ email, otp }) => {
  const { data } = await apiClient.post("/auth/verify-email", { email, otp });
  return data;
};

// ── Resend OTP ────────────────────────────────────────────────────────────────
// POST /auth/resend-otp
export const resendOtp = async ({ email }) => {
  const { data } = await apiClient.post("/auth/resend-otp", { email });
  return data;
};

// ── Login ─────────────────────────────────────────────────────────────────────
// POST /auth/login
// Backend sets httpOnly refreshToken cookie
// Backend returns accessToken in body
// returns: { statusCode: 200, data: { accessToken, user }, message }
export const login = async ({ email, password }) => {
  const { data } = await apiClient.post("/auth/login", { email, password });

  // Store access token in memory — NEVER localStorage
  if (data.data?.accessToken) {
    setAccessToken(data.data.accessToken);
  }

  return data;
  // data.data.user → { id, email, username, storageUsed }
  // data.data.accessToken → stored in memory above
};

// ── Logout ────────────────────────────────────────────────────────────────────
// POST /auth/logout
// Backend clears httpOnly cookie + revokes session
export const logout = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // If server is unreachable, still clear memory
  } finally {
    clearAccessToken();
  }
};

// ── Logout from all devices ───────────────────────────────────────────────────
// POST /auth/logout-all
export const logoutAll = async () => {
  try {
    await apiClient.post("/auth/logout-all");
  } catch {
    // still clear local state
  } finally {
    clearAccessToken();
  }
};

// ── Get current user ──────────────────────────────────────────────────────────
// GET /auth/me  (requires Authorization header — sent by interceptor)
// returns: { statusCode: 200, data: { id, email, username, storageUsed, storageUsedMB } }
export const getMe = async () => {
  const { data } = await apiClient.get("/auth/me");
  return data.data; // return just the user object
};

// ── Restore session on page refresh ──────────────────────────────────────────
// Calls /auth/refresh using the httpOnly cookie
// Called once on app startup — silently restores in-memory access token
// returns: user object if restored, null if cookie expired
export const restoreSession = async () => {
  try {
    const { data } = await apiClient.post("/auth/refresh");
    const newToken = data.data?.accessToken;

    if (!newToken) return null;

    setAccessToken(newToken);

    // Fetch user info after restoring token
    const user = await getMe();
    return user;
  } catch {
    clearAccessToken();
    return null; // cookie expired → show login
  }
};

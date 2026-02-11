export function isTokenValid() {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("token_expires_at");

  if (!token || !expiresAt) return false;

  return Date.now() < Number(expiresAt);
}

export function logout() {
  localStorage.clear();
}

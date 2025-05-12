export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_ADMIN: "/register-admin",
  WAITING_ROOM: "/waiting-room",
  ADMIN_SEARCH: "/search-song",
  ADMIN_LIVE: (songId = ":id") => `/admin/live/${songId}`,
  ACCESS_DENIED: "/access-denied",
};

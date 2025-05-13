export const API = {
  AUTH: {
    SIGNUP: "/users/signup",
    SIGNUP_ADMIN: "/users/signup-admin",
    LOGIN: "/auth/login",
  },
  SONGS: {
    SEARCH: "/songs/search",
    GET_BY_ID: (id: string) => `/songs/${id}`,
  },
};

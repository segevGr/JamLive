const BASE_URL = "http://localhost:8000";

export const API = {
  AUTH: {
    SIGNUP: `${BASE_URL}/users/signup`,
    SIGNUP_ADMIN: `${BASE_URL}/users/signup-admin`,
    LOGIN: `${BASE_URL}/auth/login`,
  },
  SONGS: {
    SEARCH: `${BASE_URL}/songs/search`,
    GET_BY_ID: (id: string) => `${BASE_URL}/songs/${id}`,
  },
  SESSION: {
    CREATE: `${BASE_URL}/session/create`,
    JOIN: `${BASE_URL}/session/join`,
  },
  USERS: {
    ME: `${BASE_URL}/users/me`,
  },
};

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
  USERS: {
    CHANGE_INSTRUMENT: "/users/me/instrument",
    CHANGE_PASSWORD: "/users/me/password",
    DELETE_USER: "/users/me",
    GET_USERS_LIST: "/users",
    CHANGE_USER_ROLE: "/users/:id",
  },
};

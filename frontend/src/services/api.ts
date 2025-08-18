export const API = {
  AUTH: {
    SIGNUP: "/users/signup",
    LOGIN: "/auth/login",
  },
  SONGS: {
    SEARCH: "/songs/search",
    GET_BY_ID: (id: string) => `/songs/${id}`,
  },
  USERS: {
    CHANGE_INSTRUMENT: "/users/me/instrument",
    CHANGE_PASSWORD: "/users/me/password",
    DELETE_ME: "/users/me",
    GET_USERS_LIST: "/users",
    CHANGE_USER_ROLE: "/users/:id",
    DELETE_USER: "/users/:id",
  },
};

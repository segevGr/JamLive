import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  songSessionReducer,
  loadingReducer,
  uiReducer,
} from "./reducers";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  songSession: songSessionReducer,
  loading: loadingReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "songSession", "loading", "ui"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// persistor.purge();

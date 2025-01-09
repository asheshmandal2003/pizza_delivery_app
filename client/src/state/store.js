import { configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "./auth.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const ONE_HOUR = 60 * 60 * 1000;

const expireTransform = createTransform(
  (inboundState) => {
    return { ...inboundState, _persistedAt: Date.now() };
  },
  (outboundState) => {
    const { _persistedAt, ...state } = outboundState;
    if (Date.now() - _persistedAt > ONE_HOUR) {
      console.warn("Persisted state expired");
      return undefined;
    }
    return state;
  },
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "auth",
  storage,
  transforms: [expireTransform],
};

const persist_reducer = persistReducer(persistConfig, authReducer);

const expirationMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  const state = storeAPI.getState();
  if (state.auth && state.auth._persistedAt) {
    const isExpired = Date.now() - state.auth._persistedAt > ONE_HOUR;
    if (isExpired) {
      console.warn("Auth state expired. Logging out user.");
      storeAPI.dispatch(logout());
    }
  }

  return result;
};

export const store = configureStore({
  reducer: persist_reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(expirationMiddleware),
});

export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.js";
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

export const store = configureStore({
  reducer: persist_reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

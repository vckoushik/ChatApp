import { configureStore } from "@reduxjs/toolkit";
import { ChatsApi } from "../api/ChatsApi";
import { AuthApi } from "../api/AuthApi";

const store = configureStore({
    reducer: {
        [ChatsApi.reducerPath]: ChatsApi.reducer,
        [AuthApi.reducerPath]: AuthApi.reducer
      },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(ChatsApi.middleware)
        .concat(AuthApi.middleware)
});
export default store;
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.jsx";
import userProfile from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REGISTER,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import UserProducts, { userProducts } from "./slices/UserProducts.jsx";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    authSlice, userProfile,UserProducts
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    // middleware: [thunk],
    devTools: true
})

export const persistor = persistStore(store);
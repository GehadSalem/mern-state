import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";



const rootReducer = combineReducers({
    user: userReducer,
})
const persistConfig = {
    key: 'root',
    storage, 
    version:1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefualtMiddleware) => 
    getDefualtMiddleware({
      serializableCheck: false,
    }),
});



export const persistor = persistStore(store);
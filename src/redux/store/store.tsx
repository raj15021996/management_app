import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

import contactReducer from '../slice/ContactSlice';

// Create the persist configuration
const persistConfig = {
  key: 'root', // Root key for the persisted state
  storage, // Storage mechanism (e.g., localStorage)
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, contactReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor };

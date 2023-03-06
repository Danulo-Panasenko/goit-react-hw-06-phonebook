import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
